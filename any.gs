function put(key, any, debug) {
  if(typeof key !== "string") throw "put: expects string key.";
  if(any === undefined) throw "put: undefined is given as a value";
  var all = putAny(key, any, debug);
  if(!(all instanceof Object)) throw "put: !(all instanceof Object).";
  cache.putAll(all);
  return all;
}

function getDerivedKeys(key){
  return ["$" + key + "$", "(" + key + ")", "[" + key + "]", "{" + key + "}"];
}

function appendDerivedKeys(array, key){
  var keys = getDerivedKeys(key);
  Array.prototype.push.apply(array, keys);
  return array;
}

/**
  @param {Any} any object, string, number, boolean or null
  @param {string} key
  @param {boolean} debug
  @return {void}
*/
function putAny(key, any, debug){  
  cache.removeAll(["$" + key + "$", "(" + key + ")", "[" + key + "]", "{" + key + "}"]);
  if(typeof any === "string") {
    var all = putString(key, any, debug);
    return all;
  }
  if(any === null || typeof any === "boolean" || typeof any === "number") {
    var all = putJson(key,any, debug);
    return all;
  }
  if(any instanceof Array) {
    var all = putArray(key, any, debug);
    return all;
  }
  if(any instanceof Object) {
    var all = putObject(key, any, debug);
    return all;
  }
  throw "put: unexpected type of value.";
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
  throw "get: key " + key + " not found.";
}

function testNull(){
  putAny("k", null, true);
  var got = getAny("k");
  if(got !== null) throw "testNull: null is expected.";
}

function testEmptyString(){
  putAny("emptyString", "", true);
  var got = getAny("emptyString");
  if(got !== "") throw "testEmptyString: empty string is expected.";
  if(got.length !== 0) throw "testEmptyString: length should be 0.";
}

function testBoolean(){
  putAny("putBoolean", true, true);
  var got = getAny("putBoolean");
  if(got !== true) throw "testBoolean: true is expected.";
  putAny("putBoolean", false, true);
  var got = getAny("putBoolean");
  if(got !== false) throw "testBoolean: false is expected.";
}

function testNumber(){
  putAny("testNumber", 1.234E6, true);
  var got = getAny("testNumber");
  if(got !== 1.234E6) throw "testNumber: 1.234E6 is expected.";
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
  putAny("testObject1" ,o0, true);
  var o0got = getAny("testObject1");
  if(JSON.stringify(o0) !== JSON.stringify(o0got)) throw "testObject1: o0 does not match.";
  
  var o1 = {a:"aaa", b:"bbb", 1:0.111, 2:0.222};
  putAny("testObject1", o1, true);
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
  putAny(k1, o1, true);
  var o1get = getAny(k1);
  if(JSON.stringify(o1) != JSON.stringify(o1get)) throw new Error("o1 and o1get is not equivalent");
}

function testObject3(){
  var o1 = {aaa: 1111, bbb: "2222", ccc: null};
  var k1 = "keykeykey5";
  putAny(k1, o1, true);
  var o1get = getAny(k1);
  if(JSON.stringify(o1) != JSON.stringify(o1get)) throw new Error("o1 and o1get is not equivalent");
}

function testObject4(){
  putAny("k4", [], true);
  var value = getAny("k4");
  if(JSON.stringify([]) !== JSON.stringify(value)) throw new Error("value is not []");
}

function testObject5(){
  putAny("k5", "", true);
  var value = getAny("k5");
  if(JSON.stringify("") !== JSON.stringify(value)) throw new Error('value is not ""');
  if(typeof value !== "string") throw new Error("type of value is not string");
  if(value.length !== 0) throw new Error("length of value is not zero");
}
