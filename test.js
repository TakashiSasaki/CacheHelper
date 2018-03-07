function testLazyKeyValueStore(){
  var lkvs = new LazyKeyValueStore();
  
  lkvs.roundtripTest("k", null); 
  lkvs.roundtripTest("emptyString", "");
  lkvs.roundtripTest("booleanTrue", true);
  lkvs.roundtripTest("booleanFalse", false);
  lkvs.roundtripTest("number", 1.234E6);
  lkvs.roundtripTest("longString",  "aosifjdajasiopfjdsajioasfopsiadfsajasd:alnvuipaojvdaslfhuiaojask;fcmuioa:kscdasnpiuacjaso");
  lkvs.roundtripTest("emptyString", "");
  lkvs.roundtripTest("testObject1", {
    a: 1,
    b: null,
    c: "hello",
    d: "oajsfioajfisdajfasdjfdaajiosfpiohruiaghruipoajeofjrghriopajgrioahiogjopefjeriopajgekop:ajbuipagojerwasgbruipoa;jfvhraeuighrewgihuiopagrhj"
  });
  lkvs.roundtripTest("testObject1", {
    a: 1,
    b: null,
    c: "hello"
  });
  lkvs.roundtripTest("testObject3", {
    aaa : 1,
    bbb : "こんにちは",
    ccc : (new Date()).toString(),
    1 : 111,
    2 : 222,
    3 : 333
  });  
  lkvs.roundtripTest("testObject4", {a:"aaa", b:"bbb", 1:0.111, 2:0.222});
  lkvs.roundtripTest("testObject5", {a:null, b:false});
  lkvs.roundtripTest("testObject6", {aaa: 1111, bbb: "2222", ccc: null});
  lkvs.roundtripTest("testArray1",  [1, 2, 3, "a", "b", "c"]);
  lkvs.roundtripTest("testArray2", []);
  lkvs.roundtripTest("testArray3", [1,2,3]);
  lkvs.appendArray("testArray3", [4,5,6]);
  assert.deepStrictEqual(lkvs.get("testArray3"), [1,2,3,4,5,6]);
  lkvs.roundtripTest("testObject7", { a : 1, b: null, c: false, d: [ "hello", 1.23, null]});
}
