function testLazyKeyValueStore(){
  var lkvs = new LazyKeyValueStore();
  
  lkvs.roundtripTest("k", null); 
  lkvs.roundtripTest("k", null, true); 
  lkvs.roundtripTest("emptyString", "");
  lkvs.roundtripTest("emptyString", "", true);
  lkvs.roundtripTest("booleanTrue", true);
  lkvs.roundtripTest("booleanTrue", true, true);
  lkvs.roundtripTest("booleanFalse", false);
  lkvs.roundtripTest("booleanFalse", false, true);
  lkvs.roundtripTest("number", 1.234E6);
  lkvs.roundtripTest("number", 1.234E6, true);
  lkvs.roundtripTest("longString",  "aosifjdajasiopfjdsajioasfopsiadfsajasd:alnvuipaojvdaslfhuiaojask;fcmuioa:kscdasnpiuacjaso", true);
  lkvs.roundtripTest("emptyString", "", true);
  lkvs.roundtripTest("testObject1", {
    a: 1,
    b: null,
    c: "hello",
    d: "oajsfioajfisdajfasdjfdaajiosfpiohruiaghruipoajeofjrghriopajgrioahiogjopefjeriopajgekop:ajbuipagojerwasgbruipoa;jfvhraeuighrewgihuiopagrhj"
  }, true);
  lkvs.roundtripTest("testObject1", {
    a: 1,
    b: null,
    c: "hello"
  }, true);
  lkvs.roundtripTest("testObject3", {
    aaa : 1,
    bbb : "こんにちは",
    ccc : (new Date()).toString(),
    1 : 111,
    2 : 222,
    3 : 333
  }, true);  
  lkvs.roundtripTest("testObject4", {a:"aaa", b:"bbb", 1:0.111, 2:0.222}, true);
  lkvs.roundtripTest("testObject5", {a:null, b:false}, true);
  lkvs.roundtripTest("testObject6", {aaa: 1111, bbb: "2222", ccc: null}, true);
  lkvs.roundtripTest("testArray1",  [1, 2, 3, "a", "b", "c"], true);
  lkvs.roundtripTest("testArray2", [], true);
  lkvs.roundtripTest("testArray3", [1,2,3], true);
  lkvs.appendArray("testArray3", [4,5,6], true);
  assert.deepStrictEqual(lkvs.get("testArray3"), [1,2,3,4,5,6], true);
  lkvs.roundtripTest("testObject7", { a : 1, b: null, c: false, d: [ "hello", 1.23, null]}, true);
}
