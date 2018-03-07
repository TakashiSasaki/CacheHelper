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
