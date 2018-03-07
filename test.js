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


function testArray1_(){
  Logger.log("testArray1: begin");
  var a = [1, 2, 3, "a", "b", "c"];
  put("k", a);
  var got = getArray("k");
  if(JSON.stringify(a) !== JSON.stringify(got)) throw "testArray1: a != got.";
  Logger.log("testArray1: end");
}

function testArray2_(){
  Logger.log("testArray2: begin");
  put("k4", []);
  var value = getArray("k4");
  if(JSON.stringify([]) !== JSON.stringify(value)) throw new Error("testArray2: value is not []");
  Logger.log("testArray2: end");
}

if(typeof global === "undefined") global=this;

function testArray3(){
  if(typeof cache === "undefined") global.cache = CacheService.getScriptCache();
  put("testArray3", [1,2,3]);
  appendArray("testArray3", [4,5,6]);
  var array2 = getArray("testArray3");
  if(JSON.stringify(array2) !== JSON.stringify([1,2,3,4,5,6])) throw "testArray3: failed";
  Logger.log(array2);
}

function testSplitByLength_(){
  Logger.log(splitByLength_("abcdefg", 3));
  Logger.log(splitByLength_("", 4));
}

function testString1_(){
  Logger.log("testString1: begin");
  var a = "aosifjdajasiopfjdsajioasfopsiadfsajasd:alnvuipaojvdaslfhuiaojask;fcmuioa:kscdasnpiuacjaso";
  var nMaxValueLength_old = nMaxValueLength;
  nMaxValueLength = 10;
  put("kkk", a);
  var b = getString("kkk");
  if(a !== b) throw "a !== b";
  put("kk1", "");
  var c = getString("kk1");
  if(JSON.stringify("") !== JSON.stringify(c)) throw "testString: c != \"\".";
  nMaxValueLength = nMaxValueLength_old;
  Logger.log("testString1: putStringCount = " + putStringCount);
  Logger.log("testString1: getStringCount = " + getStringCount);
  Logger.log("testString1: end");
}

function testString2_(){
  Logger.log("testString2: begin");
  put("k5", "");
  var value = getString("k5");
  if(JSON.stringify("") !== JSON.stringify(value)) throw new Error('value is not ""');
  if(typeof value !== "string") throw new Error("type of value is not string");
  if(value.length !== 0) throw new Error("length of value is not zero");
  Logger.log("testString2: end");
}

function test1_(){
  Logger.log("test1_: begin");
  var o = {
    a : 1,
    b: null,
    c: false,
    d: [ "hello", 1.23, null]
  }
  var all = put("test1_", o);
  Logger.log(all);
  if(JSON.stringify(o) !== JSON.stringify(get("test1_"))) throw "test1_: o != get(\"test1_\").";
  Logger.log("test1_: end");
}
