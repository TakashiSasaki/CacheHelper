/**
  @param {Any} any object, string, number or boolean
  @param {string} key automatically calculated
  @return {void}
*/
function putAny(key, any){  
  cache.removeAll(["$" + key + "$", "(" + key + ")", "[" + key + "]", "{" + key + "}"])
  if(typeof any === "string") {
    putString(key, any);
    return;
  }
  if(any === null || typeof any === "boolean" || typeof any === "number") {
    putJson(key,any);
    return;
  }
  if(any instanceof Array) {
    putArray(key, any);
    return;
  }
  if(any instanceof Object) {
    putObject(key, any);
    return;
  }
  throw "put: unexpected type of value.";
}

/**
  @param {string} keyString
  @returns {Any}
*/
function getAny(key){
  var candidates = cache.getAll(["$" + key + "$", "(" + key + ")", "[" + key + "]", "{" + key + "}"])
  if(candidates["$" + key + "$"]) {
    return getString(key, candidates["$" + key + "$"]);
  }
  if(candidates["(" + key + ")"]) {
    return getJson(key, candidates["(" + key + ")"]);
  }
  if(candidates["[" + key + "]"]) {
    return getArray(key, candidates["[" + key + "]"]);
  }
  if(candidates["{" + key + "}"]) {
    return getObject(key, candidates["{" + key + "}"]);
  }
  throw "get: key " + key + " not found.";
}

function testNull(){
  putAny("k", null);
  var got = getAny("k");
  if(got !== null) throw "testNull: null is expected.";
}

function testEmptyString(){
  putAny("emptyString", "");
  var got = getAny("emptyString");
  if(got !== "") throw "testEmptyString: empty string is expected.";
  if(got.length !== 0) throw "testEmptyString: length should be 0.";
}

function testBoolean(){
  putAny("putBoolean", true);
  var got = getAny("putBoolean");
  if(got !== true) throw "testBoolean: true is expected.";
  putAny("putBoolean", false);
  var got = getAny("putBoolean");
  if(got !== false) throw "testBoolean: false is expected.";
}

function testNumber(){
  putAny("testNumber", 1.234E6);
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
  putAny("testObject1" ,o0);
  var o0got = getAny("testObject1");
  if(JSON.stringify(o0) !== JSON.stringify(o0got)) throw "testObject1: o0 does not match.";
  
  var o1 = {a:"aaa", b:"bbb", 1:0.111, 2:0.222};
  putAny("testObject1", o1);
  var o1got = getAny("testObject1");
  if(JSON.stringify(o1) !== JSON.stringify(o1got)) throw "testObjct1: o1 does not match.";

  var o2 = {a:null, b:false}; // b is ignored when it converted to JSON representation.
  putAny("testObject1", o2);
  var o2got = getAny("testObject1");  
  if(JSON.stringify(o2) !== JSON.stringify(o2got)) throw "testObject1: o2 does not match.";
}

function testObject2(){
  var o1 = {aaa: 1111, bbb: "2222", ccc: null};
  var k1 = "keykeyley";
  putAny(k1, o1);
  var o1get = getAny(k1);
  if(JSON.stringify(o1) != JSON.stringify(o1get)) throw new Error("o1 and o1get is not equivalent");
}

function testObject3(){
  setMaxLength(10);
  var o1 = {aaa: 1111, bbb: "2222", ccc: null};
  var k1 = "keykeykey5";
  putAny(k1, o1);
  var o1get = getAny(k1);
  if(JSON.stringify(o1) != JSON.stringify(o1get)) throw new Error("o1 and o1get is not equivalent");
}

function testObject4(){
  putAny("k4", []);
  var value = getAny("k4");
  if(JSON.stringify([]) !== JSON.stringify(value)) throw new Error("value is not []");
}

function testObject5(){
  putAny("k5", "");
  var value = getAny("k5");
  if(JSON.stringify("") !== JSON.stringify(value)) throw new Error('value is not ""');
  if(typeof value !== "string") throw new Error("type of value is not string");
  if(value.length !== 0) throw new Error("length of value is not zero");
}
