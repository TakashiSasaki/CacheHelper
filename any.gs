/**
  @param {Any} any object, string, number, boolean or null
  @param {string} key
  @return {void}
*/
function putAny(key, any){  
  //cache.removeAll(["$" + key + "$", "(" + key + ")", "[" + key + "]", "{" + key + "}"]);
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

function testObject1(){
  var o0 = {
    aaa : 1,
    bbb : "こんにちは",
    ccc : (new Date()).toString(),
    1 : 111,
    2 : 222,
    3 : 333
  }
  put("testObject1" ,o0);
  var o0got = getAny("testObject1");
  if(JSON.stringify(o0) !== JSON.stringify(o0got)) throw "testObject1: o0 does not match.";
  
  var o1 = {a:"aaa", b:"bbb", 1:0.111, 2:0.222};
  put("testObject1", o1);
  var o1got = getAny("testObject1");
  if(JSON.stringify(o1) !== JSON.stringify(o1got)) throw "testObjct1: o1 does not match.";

  var o2 = {a:null, b:false}; // b is ignored when it converted to JSON representation.
  put("testObject1", o2);
  var o2got = getAny("testObject1");  
  if(JSON.stringify(o2) !== JSON.stringify(o2got)) throw "testObject1: o2 does not match.";
}

function testObject2(){
  var o1 = {aaa: 1111, bbb: "2222", ccc: null};
  var k1 = "keykeyley";
  put(k1, o1);
  var o1get = getAny(k1);
  if(JSON.stringify(o1) != JSON.stringify(o1get)) throw new Error("o1 and o1get is not equivalent");
}

function testObject3(){
  var o1 = {aaa: 1111, bbb: "2222", ccc: null};
  var k1 = "keykeykey5";
  put(k1, o1);
  var o1get = getAny(k1);
  if(JSON.stringify(o1) != JSON.stringify(o1get)) throw new Error("o1 and o1get is not equivalent");
}

function testObject4(){
  put("k4", []);
  var value = getAny("k4");
  if(JSON.stringify([]) !== JSON.stringify(value)) throw new Error("value is not []");
}

function testObject5(){
  put("k5", "");
  var value = getAny("k5");
  if(JSON.stringify("") !== JSON.stringify(value)) throw new Error('value is not ""');
  if(typeof value !== "string") throw new Error("type of value is not string");
  if(value.length !== 0) throw new Error("length of value is not zero");
}

if(exports === undefined) exports = {};
exports.testAnyNull = testAnyNull;
exports.testAnyEmptyString = testAnyEmptyString;
exports.testAnyBoolean = testAnyBoolean;
exports.testAnyNumber = testAnyNumber;

