putArrayCount = 0;
getArrayCount = 0;

/**
  @param {string} key
  @param {Array} array
  @return {object}
*/
function putArray(key, array) {
  if(typeof key !== "string") throw "putArray: expects string key.";
  if(!(array instanceof Array)) throw "putArray: expects array";
  putArrayCount += 1;
  var all = {"TO BE REMOVED": getDerivedKeys_(key)};
  all["[" + key + "]"] = "" + array.length;
  for(var i=0; i<array.length; ++i) {
    var k = "[" + key + "]" + i;
    merge_(all, putAny(k, array[i]));
  }//for
  return all;
}//putArray

/**
 * @param {stirng} key
 * @param {object} values, optional
 * @return {object}
 */
function getArray(key, values){
  if(typeof key !== "string") throw "getArray: expects string key.";
  getArrayCount += 1;
  values = prefetchAny_(values, [key]);
  if(typeof values["[" + key + "]"] === "undefined") throw "getArray: [" + key + "] not found";
  var length = parseInt(values["[" + key + "]"]);
  var result = [];
  for(var i=0; i < length; ++i) {
    result.push(getAny("[" + key + "]" + i, values));
  }
  return result;
}//getArray

/**
 * @param {string} key
 * @param {array} array
 * @return {object}
*/
function appendArray(key, array) {
  if(typeof key !== "string") throw "appendArray: expects string key";
  if(!(array instanceof Array)) throw "appendArray: expects array value";
  var l = cache.get("[" + key + "]");
  if(l === null) throw "appendArray: key [" + key + "] not found";
  var all = {};
  all["[" + key + "]"] = "" + (parseInt(l) + array.length);
  for(var i=0; i<array.length; ++i) {
    merge_(all, putAny("[" + key + "]" + (parseInt(l) + i), array[i]));
  }//for
  if(typeof all["TO BE REMOVED"] !== "undefined") {
    cache.removeAll(all["TO BE REMOVED"]);
    delete all["TO BE REMOVED"];
  }
  cache.putAll(all);
}//appendArray

function resetArrayCount_(){
  putArrayCount = 0;
  getArrayCount = 0;
}

function showArrayCount_(){
  Logger.log("putArrayCount = " + putArrayCount);
  Logger.log("getArrayCount = " + getArrayCount);
}

function testArray1_(){
  Logger.log("testArray1: begin");
  var a = [1, 2, 3, "a", "b", "c"];
  put("k", a);
  var got = getArray("k");
  if(JSON.stringify(a) !== JSON.stringify(got)) throw "testArray1: a != got.";
  Logger.log("testArray1: end");
}

function testArray2_(){
  Logger.log("testArray2: begin");
  put("k4", []);
  var value = getArray("k4");
  if(JSON.stringify([]) !== JSON.stringify(value)) throw new Error("testArray2: value is not []");
  Logger.log("testArray2: end");
}

if(typeof global === "undefined") global=this;

function testArray3(){
  if(typeof cache === "undefined") global.cache = CacheService.getScriptCache();
  put("testArray3", [1,2,3]);
  appendArray("testArray3", [4,5,6]);
  var array2 = getArray("testArray3");
  if(JSON.stringify(array2) !== JSON.stringify([1,2,3,4,5,6])) throw "testArray3: failed";
  Logger.log(array2);
}


if(exports === undefined) exports = {};
exports.getArray   = getArray;
exports.putArray   = putArray;
exports.testArray1 = testArray1_;
exports.testArray2 = testArray2_;
exports.resetArrayCount = resetArrayCount_;
exports.showArrayCount = showArrayCount_;

if(typeof process !== "undefined"){
  global.Logger           = console;
  global.cache            = new (require("./emulate.js").LocalCache)();
  global.commit_          = require("./misc.js").commit_;
  global.getDerivedKeys_  = require("./misc.js").getDerivedKeys_;
  global.merge_           = require("./misc.js").merge_;
  global.prefetchAny_     = require("./misc.js").prefetchAny_;
  global.put              = require("./misc.js").put;
  global.putAny           = require("./any.js").putAny;
  global.getAny           = require("./any.js").getAny;
  testArray1_();
  testArray2_();
  testArray3();
}

