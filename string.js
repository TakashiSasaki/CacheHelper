nMaxValueLength = 50000;
putStringCount = 0;
getStringCount = 0;

/**
  @param {string} key
  @param {string} string
  @return {object}
*/

function putString(key, string) {
  if(typeof key !== "string") throw "putString: expects string key.";
  if(typeof string !== "string") throw "putString: expects strinv value.";
  putStringCount += 1;
  var all = {"TO BE REMOVED": getDerivedKeys_(key)};
  var split = splitString_(string);
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
  getStringCount += 1;
  values = prefetchAny_(values, [key]);
  if(typeof values["$" + key + "$"] === "undefined") throw "getString: key $" + key + "$ not found.";
  var length = parseInt(values["$" + key + "$"]);
  if(length == 0) return "";

  var keys = [];
  for(var i=0; i<length; ++i) {
    keys.push("$" + key + "$" + i);
  }
  values = prefetch_(values, keys);
  var result = [];
  for(var i=0; i<length; ++i) {
    var s = values["$" + key + "$" + i];
    if(s === null) throw "getString: missing a part of string value.";
    result.push(s);
  }
  return result.join("");
}//getString

function splitString_(string) {
  if(typeof string !== "string") throw "splitByLength_: expects string";
  var array = [];
  for(var i=0; i<string.length; i+= nMaxValueLength) {
    array.push(string.substr(i, nMaxValueLength));
  }
  return array;
}

function testSplitByLength_(){
  Logger.log(splitByLength_("abcdefg", 3));
  Logger.log(splitByLength_("", 4));
}

function testString1_(){
  Logger.log("testString1: begin");
  var a = "aosifjdajasiopfjdsajioasfopsiadfsajasd:alnvuipaojvdaslfhuiaojask;fcmuioa:kscdasnpiuacjaso";
  var nMaxValueLength_old = nMaxValueLength;
  nMaxValueLength = 10;
  commit_(putString("kkk", a));
  var b = getString("kkk");
  if(a !== b) throw "a !== b";
  commit_(putString("kk1", ""));
  var c = getString("kk1");
  if(JSON.stringify("") !== JSON.stringify(c)) throw "testString: c != \"\".";
  nMaxValueLength = nMaxValueLength_old;
  Logger.log("testString1: putStringCount = " + putStringCount);
  Logger.log("testString1: getStringCount = " + getStringCount);
  Logger.log("testString1: end");
}

function testString2_(){
  Logger.log("testString2: begin");
  commit_(putString("k5", ""));
  var value = getString("k5");
  if(JSON.stringify("") !== JSON.stringify(value)) throw new Error('value is not ""');
  if(typeof value !== "string") throw new Error("type of value is not string");
  if(value.length !== 0) throw new Error("length of value is not zero");
  Logger.log("testString2: end");
}

function showStringCount_(){
  Logger.log("putStringCount = " + putStringCount);
  Logger.log("getStringCount = " + getStringCount);
}

function resetStringCount_(){
  getStringCount = 0;
  putStringCount = 0;
}

if(exports === undefined) exports = {};
exports.putString        = putString;
exports.getString        = getString;
exports.testString1      = testString1_;
exports.testString2      = testString2_;
exports.showStringCount  = showStringCount_;
exports.resetStringCount = resetStringCount_;
exports.nMaxValueLength  = nMaxValueLength;
;

if(typeof process !== "undefined") {
  global.prefetchAny_ = require("./misc.js").prefetchAny_;
  global.prefetch_    = require("./misc.js").prefetch_;
}

