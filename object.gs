/**
  @param {string} key
  @param {object} object
  @return {object}
*/
function putObject(key, object) {
  if(typeof key !== "string") throw "putObject: expects string key.";
  if(!(object instanceof Object)) throw "putObject: expects an object as a value";
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
  if(values === undefined) {values = {};}
  if(values["{" + key + "}"] === undefined) {
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
  merge(values, cache.getAll(keys));
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
  removeAndPut(putObject("k", o));
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
  Logger.log("testObject1: end");
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
exports.testObject  = testObject;
exports.testObject1 = testObject1;
exports.testObject2 = testObject2;
exports.testObject3 = testObject3;
exports.testObject4 = testObject4;
exports.testObject5 = testObject5;

