if(typeof assert === "undefined") require("./assert");

function testHashWrapper(){
  var hw = new HashWrapper();
  
  hw.roundtripTest("k", null); 
  hw.roundtripTest("emptyString", "");
  hw.roundtripTest("booleanTrue", true);
  hw.roundtripTest("booleanFalse", false);
  hw.roundtripTest("number", 1.234E6);
  hw.roundtripTest("shortString", "hello");
  hw.roundtripTest("longString",  "aosifjdajasiopfjdsajioasfopsiadfsajasd:alnvuipaojvdaslfhuiaojask;fcmuioa:kscdasnpiuacjaso");
  hw.roundtripTest("testObject1", {
    a: 1,
    b: null,
    c: "hello",
    d: "oajsfioajfisdajfasdjfdaajiosfpiohruiaghruipoajeofjrghriopajgrioahiogjopefjeriopajgekop:ajbuipagojerwasgbruipoa;jfvhraeuighrewgihuiopagrhj"
  });
  hw.roundtripTest("testObject1", {
    a: 1,
    b: null,
    c: "hello"
  });
  hw.roundtripTest("testObject3", {
    aaa : 1,
    bbb : "こんにちは",
    ccc : (new Date()).toString(),
    1 : 111,
    2 : 222,
    3 : 333
  });  
  hw.roundtripTest("testObject4", {a:"aaa", b:"bbb", 1:0.111, 2:0.222});
  hw.roundtripTest("testObject5", {a:null, b:false}, true);
  hw.roundtripTest("testObject6", {aaa: 1111, bbb: "2222", ccc: null});
  hw.roundtripTest("testArray1",  [1, 2, 3, "a", "b", "c"]);
  hw.roundtripTest("testArray2", []);
  hw.roundtripTest("testArray3", [1,2,3]);
  hw.appendArray("testArray3", [4,5,6]);
  assert.deepStrictEqual(hw.get("testArray3"), [1,2,3,4,5,6]);
  hw.roundtripTest("testObject7", { a : 1, b: null, c: false, d: [ "hello", 1.23, null]});
}

if(typeof process !== "undefined") {
  //assert = require("assert");
  HashWrapper = require("./HashWrapper").HashWrapper;
  testHashWrapper();
  console.log("testHashWrapper finished");
}

