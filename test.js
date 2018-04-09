function testHashWrapper_(cache){
	var assert = require("myassert");
  assert.isNotUndefined(cache);
  assert.lengthOf(arguments, 1);

  (function(){
    var simpleCache = new SimpleCache();
    var hw1 = new HashWrapper(simpleCache, 1000);
    var hw2 = new HashWrapper(simpleCache, 1000);
    hw1.put("abc", 1);
    hw1.commit();
    assert.strictEqual(hw1.get("abc"), 1);
    assert.strictEqual(hw2.get("abc"), 1);
  })();

  var hw = new HashWrapper(cache, 1000);
  hw.reset();
  hw.roundtripTest("abc", {"a": 23});
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
  hw.reset();
  hw.put("abcde", {a:1, b:2});
  hw.setProperty("abcde", "c", 3);
  assert.deepStrictEqual(hw.get("abcde"), {a:1, b:2, c:3});
  hw.setProperty("abcde", "b", "hello");
  hw.setProperty("abcde", "d", [5,6,7]);
  assert.deepStrictEqual(hw.get("abcde"), {a:1, b:"hello", c:3, d:[5,6,7]});
}

//for Node.js
if(typeof process !== "undefined") {
  var modules = [
    "JOLSH",
    "HashWrapper",
    "SimpleCache", 
    "xObject",
    "xJson",
    "xString", 
    "xArray",
    "setProperty_",
    "appendArray_",
  ];
  for(var i in modules) {
    var module = require("./" + modules[i]);
    for(var j in module) {
      if(typeof module[j] === "function") {
        global[j] = module[j];
        console.log("importing " + j + " from " + modules[i]);
      }
    }//for j
  }//for i
  const simpleCache = new SimpleCache();
  testHashWrapper_(simpleCache);
  console.log("testHashWrapper finished");
}

//for Google Apps Script
function test(){ 
  testHashWrapper_(new SimpleCache());
  testHashWrapper_(CacheService.getScriptCache());
}//test()

