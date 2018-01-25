putObjectCount = 0;
getObjectCount = 0;
getObjectPrefetchMissedCount = 0;

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
  var all = {"TO BE REMOVED": getDerivedKeys(key)};
  all["{" + key + "}"] = JSON.stringify(properties);
  for(var i in object) {
    merge(all, putAny("{" + key + "}" + i, object[i]));
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
  if(values["{" + key + "}"] === undefined) {
    getObjectPrefetchMissedCount += 1;
    values["{" + key + "}"] =  cache.get("{" + key + "}");
    if(values["{" + key + "}"] === null) throw "getObject: key {" + key + "} not found.";
  }
  var properties = JSON.parse(values["{" + key + "}"]);
  if(!(properties instanceof Array)) throw "getObject: no array in {" + key + "}.";
  var keys = [];
  for(var i=0; i<properties.length; ++i) {
    keys.push("${" + key + "}" + properties[i] + "$");
    keys.push("({" + key + "}" + properties[i] + ")");
    keys.push("{{" + key + "}" + properties[i] + "}");
    keys.push("[{" + key + "}" + properties[i] + "]");
  }
  prefetch(values, keys);
  //merge(values, cache.getAll(keys));
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
  }
  return result;
}//getObject

function testObject(){
  Logger.log("testObject: begin");
  var o = {
    a: 1,
    b: null,
    c: "hello"
  };
  commit(putObject("k", o));
  var got = getObject("k");
  if(JSON.stringify(o) !== JSON.stringify(got)) throw "testObject: o != got.";
  Logger.log("testObject: end");
}

function testObject1(){
  Logger.log("testObject1: begin");
  var o0 = {
    aaa : 1,
    bbb : "こんにちは",
    ccc : (new Date()).toString(),
    1 : 111,
    2 : 222,
    3 : 333
  }
  commit(putObject("testObject1" ,o0));
  var o0got = getObject("testObject1");
  if(JSON.stringify(o0) !== JSON.stringify(o0got)) throw "testObject1: o0 does not match.";
  
  var o1 = {a:"aaa", b:"bbb", 1:0.111, 2:0.222};
  commit(putObject("testObject1", o1));
  var o1got = getObject("testObject1");
  if(JSON.stringify(o1) !== JSON.stringify(o1got)) throw "testObjct1: o1 does not match.";

  var o2 = {a:null, b:false}; // b is ignored when it converted to JSON representation.
  commit(putObject("testObject1", o2));
  var o2got = getObject("testObject1");  
  if(JSON.stringify(o2) !== JSON.stringify(o2got)) throw "testObject1: o2 does not match.";
  Logger.log("testObject1: end");
}

function resetObjectCount(){
  putObjectCount = 0;
  getObjectCount = 0;
  getObjectPrefetchMissedCount = 0;
}

function showObjectCount(){
  Logger.log("putObjectCount = " + putObjectCount);
  Logger.log("getObjectCount = " + getObjectCount);
  Logger.log("getObjectPrefetchMissedCount = " + getObjectPrefetchMissedCount);
}


function testObject2(){
  Logger.log("testObject2: begin");
  var o1 = {aaa: 1111, bbb: "2222", ccc: null};
  var k1 = "keykeyley";
  commit(putObject(k1, o1));
  var o1get = getObject(k1);
  if(JSON.stringify(o1) != JSON.stringify(o1get)) throw new Error("o1 and o1get is not equivalent");
  Logger.log("testObject2: end");
}

function testObject3(){
  Logger.log("testObject3: begin");
  var o1 = {aaa: 1111, bbb: "2222", ccc: null};
  var k1 = "keykeykey5";
  commit(putObject(k1, o1));
  var o1get = getObject(k1);
  if(JSON.stringify(o1) != JSON.stringify(o1get)) throw new Error("o1 and o1get is not equivalent");
  Logger.log("testObject3: end");
}

if(exports === undefined) exports = {};
exports.putObject   = putObject;
exports.getObject   = getObject;
exports.resetObjectCount = resetObjectCount;
exports.showObjectCount = showObjectCount;
exports.testObject  = testObject;
exports.testObject1 = testObject1;
exports.testObject2 = testObject2;
exports.testObject3 = testObject3;

