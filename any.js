if(console === undefined) console = Logger;

  /**
    @param {Any} any object, string, number, boolean or null
    @param {string} key
    @return {void}
  */
function putAny_(key, any){  
  if(typeof keye !== "string") throw "putAny expects string key.";
  putAny_.count += 1;
  if(typeof any === "string") {
    this.putString(key, any);
  }
  if(any === null || typeof any === "boolean" || typeof any === "number") {
    this.putJson(key,any);
  }
  if(any instanceof Array) {
    this.putArray(key, any);
  }
  if(any instanceof Object) {
    this.putObject(key, any);
  }
  throw "KeyValueStore#putAny: unexpected type of value. " + typeof any;
}

/**
  @param {string} key
  @param {object} values
  @returns {Any}
*/
function getAny_(key, values){
  if(typeof key !== "string") throw "getAny expects string key.";
  getAny_.count += 1;
  //if(values === undefined) values={};
  values = prefetchAny_(values, [key]);
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

function testAnyNull_(){
  Logger.log("testAnyNull: begin");
  //var all = putAny("k", null);
  put("k", null); 
  var got = getAny("k");
  if(got !== null) throw "testAnyNull: null is expected.";
  Logger.log("testAnyNull: end");
}

function testAnyEmptyString_(){
  Logger.log("testAnyEmptyString: beign");
  put("testAnyEmptyString", "");
  var got = getAny("testAnyEmptyString");
  if(got !== "") throw "testAnyEmptyString: empty string is expected.";
  if(got.length !== 0) throw "testAnyEmptyString: length should be 0.";
  Logger.log("testAnyEmptyString: end");
}

function testAnyBoolean_(){
  Logger.log("testAnyBoolean: begin");
  put("testAnyBoolean", true);
  var got = getAny("testAnyBoolean");
  if(got !== true) throw "testAnyBoolean: true is expected.";
  put("testAnyBoolean", false);
  var got = getAny("testAnyBoolean");
  if(got !== false) throw "testAnyBoolean: false is expected.";
  Logger.log("testAnyBoolean: end");
}

function testAnyNumber_(){
  Logger.log("testAnyNumber: begin");
  put("testAnyNumber", 1.234E6);
  var got = getAny("testAnyNumber");
  if(got !== 1.234E6) throw "testAnyNumber: 1.234E6 is expected.";
  Logger.log("testAnyNumber: end");
}

if(typeof exports === "undefined") exports = {};
exports.putAny             = putAny_;
exports.getAny             = getAny_;
exports.testAnyNull        = testAnyNull_;
exports.testAnyEmptyString = testAnyEmptyString_;
exports.testAnyBoolean     = testAnyBoolean_;
exports.testAnyNumber      = testAnyNumber_;

if(typeof process !== "undefined"){ 
  global.putJson = require("./json.js").putJson;
  global.getJson = require("./json.js").getJson;
  global.putString = require("./string.js").putString;
  global.getString = require("./string.js").getString;
  global.getArray = require("./array.js").getArray;
  global.putArray = require("./array.js").putArray;
}
