putAnyCount = 0;
getAnyCount = 0;

/**
  @param {Any} any object, string, number, boolean or null
  @param {string} key
  @return {void}
*/
function putAny(key, any){  
  putAnyCount += 1;
  if(typeof any === "string") {
    var all = putString(key, any);
    return all;
  }
  if(any === null || typeof any === "boolean" || typeof any === "number") {
    var all = putJson(key,any);
    return all;
  }
  if(any instanceof Array) {
    var all = putArray(key, any);
    return all;
  }
  if(any instanceof Object) {
    var all = putObject(key, any);
    return all;
  }
  throw "putAny: unexpected type of value.";
}

/**
  @param {string} key
  @param {object} values
  @returns {Any}
*/
function getAny(key, values){
  getAnyCount += 1;
  if(values === undefined) values={};
  merge(values, cache.getAll(["$" + key + "$", "(" + key + ")", "[" + key + "]", "{" + key + "}"]));
  if(values["$" + key + "$"]) {
    return getString(key, values);
  }
  if(values["(" + key + ")"]) {
    return getJson(key, values);
  }
  if(values["[" + key + "]"]) {
    return getArray(key, values);
  }
  if(values["{" + key + "}"]) {
    return getObject(key, values);
  }
  throw "getAny: key " + key + " not found.";
}

function resetAnyCount(){
  putAnyCount = 0;
  getAnyCount = 0;
}

function showAnyCount(){
  Logger.log("putAnyCount = " + putAnyCount);
  Logger.log("getAnyCount = " + getAnyCount);
}


function testAnyNull(){
  Logger.log("testAnyNull: begin");
  var all = putAny("k", null);
  removeAndPut(all); 
  var got = getAny("k");
  if(got !== null) throw "testAnyNull: null is expected.";
  Logger.log("testAnyNull: end");
}

function testAnyEmptyString(){
  Logger.log("testAnyEmptyString: beign");
  var all = putAny("testAnyEmptyString", "");
  removeAndPut(all);
  var got = getAny("testAnyEmptyString");
  if(got !== "") throw "testAnyEmptyString: empty string is expected.";
  if(got.length !== 0) throw "testAnyEmptyString: length should be 0.";
  Logger.log("testAnyEmptyString: end");
}

function testAnyBoolean(){
  Logger.log("testAnyBoolean: begin");
  var all = putAny("testAnyBoolean", true);
  removeAndPut(all);
  var got = getAny("testAnyBoolean");
  if(got !== true) throw "testAnyBoolean: true is expected.";
  var all = putAny("testAnyBoolean", false);
  removeAndPut(all);
  var got = getAny("testAnyBoolean");
  if(got !== false) throw "testAnyBoolean: false is expected.";
  Logger.log("testAnyBoolean: end");
}

function testAnyNumber(){
  Logger.log("testAnyNumber: begin");
  var all = putAny("testAnyNumber", 1.234E6);
  removeAndPut(all);
  var got = getAny("testAnyNumber");
  if(got !== 1.234E6) throw "testAnyNumber: 1.234E6 is expected.";
  Logger.log("testAnyNumber: end");
}

if(typeof exports === "undefined") exports = {};
exports.putAny             = putAny;
exports.getAny             = getAny;
exports.testAnyNull        = testAnyNull;
exports.testAnyEmptyString = testAnyEmptyString;
exports.testAnyBoolean     = testAnyBoolean;
exports.testAnyNumber      = testAnyNumber;
exports.showAnyCount       = showAnyCount;
exports.resetAnyCount      = resetAnyCount;

