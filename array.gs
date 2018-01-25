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
    merge_(all, putAny("[" + key + "]" + i, array[i]));
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

function appendArray(key, array) {
  if(typeof key !== "string") throw "appendArray: expects string key";
  if(!(array instanceof Array)) throw "appendArray: expects array value";
  var l = cache.get("[" + key + "]");
  if(l === null) throw "appendArray: key [" + key + "] not found";
  cache.put("[" + key + "]", parseInt(l) + array.length);
  for(var i=0; i<array.length; ++i) {
    putAny("[" + key + "]" + parseInt(l) + i, array[i]);
  }//for
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
  commit_(putArray("k", a));
  var got = getArray("k");
  if(JSON.stringify(a) !== JSON.stringify(got)) throw "testArray1: a != got.";
  Logger.log("testArray1: end");
}

function testArray2_(){
  Logger.log("testArray2: begin");
  commit_(putArray("k4", []));
  var value = getArray("k4");
  if(JSON.stringify([]) !== JSON.stringify(value)) throw new Error("testArray2: value is not []");
  Logger.log("testArray2: end");
}

if(exports === undefined) exports = {};
exports.getArray   = getArray;
exports.putArray   = putArray;
exports.testArray1 = testArray1_;
exports.testArray2 = testArray2_;
exports.resetArrayCount = resetArrayCount_;
exports.showArrayCount = showArrayCount_;


