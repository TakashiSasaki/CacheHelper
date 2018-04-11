if(typeof assert === "undefined") require("myassert-browserified");
if(typeof StructuredCache === "undefined") StructuredCache = require("StructuredCache");
if(typeof SimpleCache === "undefined") SimpleCache = require("SimpleCache");

function testSimpleCache(){
  var simpleCache = new SimpleCache();
  const hw1 = new StructuredCache(simpleCache, 1000);
  const hw2 = new StructuredCache(simpleCache, 1000);
  hw1.put("abc", 1);
  hw1.commit();
  assert.strictEqual(hw1.get("abc"), 1);
  assert.strictEqual(hw2.get("abc"), 1);
}

if(typeof process !== "undefined"){
  testSimpleCache();
}

