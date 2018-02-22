putObjectCount = 0;
getObjectCount = 0;

/**
  @param {string} key
  @param {object} object
  @return {object}
*/
function putObject(key, object) {
  if(typeof key !== "string") throw "putObject: expects string key.";
  if(!(object instanceof Object)) throw "putObject: expects an object as a value";
  putObjectCount += 1;
  var properties = [];
  for(var i in object) {
    properties.push(i);
  }
  var all = {"TO BE REMOVED": getDerivedKeys_(key)};
  all["{" + key + "}"] = JSON.stringify(properties);
  for(var i in object) {
    merge_(all, putAny("{" + key + "}" + i, object[i]));
  }  
  return all;
}//putObject

/**
  @param {string} key
  @param {value} value optional
*/
function getObject(key, values) {
  if(typeof key !== "string") throw "getObject: expects string key.";
  getObjectCount += 1;
  if(!(values instanceof Object)) {values = {};}
  values = prefetchAny_(values, [key]);
  if(typeof values["{" + key + "}"] === "undefined") throw "getObject: key {" + key + "} not found.";
  var properties = JSON.parse(values["{" + key + "}"]);
  if(!(properties instanceof Array)) throw "getObject: no array in {" + key + "}.";
  var keys = [];
  for(var i=0; i<properties.length; ++i) {
    keys.push("{" + key + "}" + properties[i]);
  }
  values = prefetchAny_(values, keys);
  var result = {};
  for(var i=0; i<properties.length; ++i) {
    if(typeof values["${" + key + "}" + properties[i] + "$"] === "string") {
      result[properties[i]] = getString("{" + key + "}" + properties[i], values);
      continue;
    }
    if(typeof values["({" + key + "}" + properties[i] + ")"] === "string") {
      result[properties[i]] = getJson("{" + key + "}" + properties[i], values);
      continue;
    }
    if(typeof values["{{" + key + "}" + properties[i] + "}"] === "string") {
      result[properties[i]] = getObject("{" + key + "}" + properties[i], values);
      continue;
    }
    if(typeof values["[{" + key + "}" + properties[i] + "]"] === "string") {
      result[properties[i]] = getArray("{" + key + "}" + properties[i], values);
      continue;
    }
    throw "getObject: any type of value is not found for {" + key  + "}" + properties[i];
  }
  return result;
}//getObject

function testObject_(){
  Logger.log("testObject_: begin");
  var o = {
    a: 1,
    b: null,
    c: "hello"
  };
  put("k", o);
  var got = getObject("k");
  if(JSON.stringify(o) !== JSON.stringify(got)) throw "testObject_: o != got.";
  Logger.log("testObject_: end");
}

function testObject1_(){
  Logger.log("testObject1_: begin");
  var o0 = {
    aaa : 1,
    bbb : "こんにちは",
    ccc : (new Date()).toString(),
    1 : 111,
    2 : 222,
    3 : 333
  }
  put("testObject1_" ,o0);
  var o0got = getObject("testObject1_");
  if(JSON.stringify(o0) !== JSON.stringify(o0got)) throw "testObject1_: o0 does not match.";
  
  var o1 = {a:"aaa", b:"bbb", 1:0.111, 2:0.222};
  put("testObject1_", o1);
  var o1got = getObject("testObject1_");
  if(JSON.stringify(o1) !== JSON.stringify(o1got)) throw "testObjct1: o1 does not match.";

  var o2 = {a:null, b:false}; // b is ignored when it converted to JSON representation.
  put("testObject1_", o2);
  var o2got = getObject("testObject1_");  
  if(JSON.stringify(o2) !== JSON.stringify(o2got)) throw "testObject1_: o2 does not match.";
  Logger.log("testObject1_: end");
}

function resetObjectCount_(){
  putObjectCount = 0;
  getObjectCount = 0;
}

function showObjectCount_(){
  Logger.log("putObjectCount = " + putObjectCount);
  Logger.log("getObjectCount = " + getObjectCount);
}


function testObject2_(){
  Logger.log("testObject2_: begin");
  var o1 = {aaa: 1111, bbb: "2222", ccc: null};
  var k1 = "keykeyley";
  put(k1, o1);
  var o1get = getObject(k1);
  if(JSON.stringify(o1) != JSON.stringify(o1get)) throw new Error("o1 and o1get is not equivalent");
  Logger.log("testObject2_: end");
}

function testObject3_(){
  Logger.log("testObject3_: begin");
  var o1 = {aaa: 1111, bbb: "2222", ccc: null};
  var k1 = "keykeykey5";
  put(k1, o1);
  var o1get = getObject(k1);
  if(JSON.stringify(o1) != JSON.stringify(o1get)) throw new Error("o1 and o1get is not equivalent");
  Logger.log("testObject3_: end");
}

if(exports === undefined) exports = {};
exports.putObject   = putObject;
exports.getObject   = getObject;
exports.resetObjectCount = resetObjectCount_;
exports.showObjectCount = showObjectCount_;
exports.testObject  = testObject_;
exports.testObject1 = testObject1_;
exports.testObject2 = testObject2_;
exports.testObject3 = testObject3_;

