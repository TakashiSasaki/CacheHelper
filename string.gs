nMaxValueLength = 50000;

/**
  @param {string} key
  @param {string} string
  @return {object}
*/
function putString(key, string) {
  if(typeof key !== "string") throw "putString: expects string key.";
  if(typeof string !== "string") throw "putString: expects strinv value.";
  var all = {"TO BE REMOVED": getDerivedKeys(key)};
  var split = splitByLength(string, nMaxValueLength);
  all["$" + key + "$"] = "" + split.length;
  for(var i=0; i<split.length; ++i) {
    all["$" + key + "$" + i] = split[i];
  }
  return all;
}//putString

/**
  @param {string} key
  @param {object} values
  @return {string}
*/
function getString(key, values) {
  if(typeof key !== "string") throw "getString: expects string key.";
  if(values === undefined) values = {};
  if(values["$" + key + "$"] === undefined) {
    values["$" + key + "$"] = cache.get("$" + key + "$");
    if(values["$" + key + "$"] === null) throw "getString: key $" + key + "$ not found.";
  }
  var length = parseInt(values["$" + key + "$"]);
  if(length == 0) return "";

  var keys = [];
  for(var i=0; i<length; ++i) {
    keys.push("$" + key + "$" + i);
  }
  merge(values, cache.getAll(keys));
  //if(valueStrings === null) return null;
  var result = [];
  for(var i=0; i<length; ++i) {
    var s = values["$" + key + "$" + i];
    if(s === null) throw "getString: missing a part of string value.";
    result.push(s);
  }
  return result.join("");
}//getString

function splitByLength(string, length) {
  if(typeof string !== "string") throw "splitByLength: expects string";
  var array = [];
  for(var i=0; i<string.length; i+=length) {
    array.push(string.substr(i, length));
  }
  return array;
}

function testSplitByLength(){
  Logger.log(splitByLength("abcdefg", 3));
  Logger.log(splitByLength("", 4));
}

function testString(){
  Logger.log("testString: begin");
  var a = "aosifjdajasiopfjdsajioasfopsiadfsajasd:alnvuipaojvdaslfhuiaojask;fcmuioa:kscdasnpiuacjaso";
  var nMaxValueLength_old = nMaxValueLength;
  nMaxValueLength = 10;
  removeAndPut(putString("kkk", a));
  var b = getString("kkk");
  if(a !== b) throw "a !== b";
  removeAndPut(putString("kk1", ""));
  var c = getString("kk1");
  Logger.log(c);
  nMaxValueLength = nMaxValueLength_old;
  Logger.log("testString :end");
}

if(exports === undefined) exports = {};
exports.testString = testString;
