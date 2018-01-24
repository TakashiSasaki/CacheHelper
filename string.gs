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

function testString1(){
  Logger.log("testString1: begin");
  var a = "aosifjdajasiopfjdsajioasfopsiadfsajasd:alnvuipaojvdaslfhuiaojask;fcmuioa:kscdasnpiuacjaso";
  var nMaxValueLength_old = nMaxValueLength;
  nMaxValueLength = 10;
  removeAndPut(putString("kkk", a));
  var b = getString("kkk");
  if(a !== b) throw "a !== b";
  removeAndPut(putString("kk1", ""));
  var c = getString("kk1");
  if(JSON.stringify("") !== JSON.stringify(c)) throw "testString: c != \"\".";
  nMaxValueLength = nMaxValueLength_old;
  Logger.log("testString1: end");
}

function testString2(){
  Logger.log("testString2: begin");
  removeAndPut(putString("k5", ""));
  var value = getString("k5");
  if(JSON.stringify("") !== JSON.stringify(value)) throw new Error('value is not ""');
  if(typeof value !== "string") throw new Error("type of value is not string");
  if(value.length !== 0) throw new Error("length of value is not zero");
  Logger.log("testString2: end");
}

if(exports === undefined) exports = {};
exports.putString  = putString;
exports.getString  = getString;
exports.testString1 = testString1;
exports.testString2 = testString2;
