function testKeyValueStore(){
  var keyValueStore = new KeyValueStore();
  keyValueStore.nMaxValueLength = 10;
  
  keyValueStore.roundtripTest("k", null); 
  keyValueStore.roundtripTest("emptyString", "");
  keyValueStore.roundtripTest("booleanTrue", true);
  keyValueStore.roundtripTest("booleanFalse", false);
  keyValueStore.roundtripTest("number", 1.234E6);
  keyValueStore.roundtripTest("longString",  "aosifjdajasiopfjdsajioasfopsiadfsajasd:alnvuipaojvdaslfhuiaojask;fcmuioa:kscdasnpiuacjaso");
  keyValueStore.roundtripTest("emptyString", "");
  keyValueStore.roundtripTest("testObject1", {
    a: 1,
    b: null,
    c: "hello",
    d: "oajsfioajfisdajfasdjfdaajiosfpiohruiaghruipoajeofjrghriopajgrioahiogjopefjeriopajgekop:ajbuipagojerwasgbruipoa;jfvhraeuighrewgihuiopagrhj"
  });
  keyValueStore.roundtripTest("testObject1", {
    a: 1,
    b: null,
    c: "hello"
  });
  keyValueStore.roundtripTest("testObject3", {
    aaa : 1,
    bbb : "こんにちは",
    ccc : (new Date()).toString(),
    1 : 111,
    2 : 222,
    3 : 333
  });  
  keyValueStore.roundtripTest("testObject4", {a:"aaa", b:"bbb", 1:0.111, 2:0.222});
  keyValueStore.roundtripTest("testObject5", {a:null, b:false});
  keyValueStore.roundtripTest("testObject6", {aaa: 1111, bbb: "2222", ccc: null});
}
