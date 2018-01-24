if(global.Logger === undefined) global.Logger = console;
LocalCache = require("./emulate.gs").LocalCache;
global.cache = new LocalCache();

getDerivedKeys     = require("./misc.gs").getDerivedKeys;
removeAndPut       = require("./misc.gs").removeAndPut;
test1              = require("./misc.gs").test1;
merge              = require("./array.gs").merge;
putJson            = require("./json.gs").putJson;
getJson            = require("./json.gs").getJson;
testJson           = require("./json.gs").testJson;
putString          = require("./string.gs").putString;
getString          = require("./string.gs").getString;
testString1        = require("./string.gs").testString1;
testString2        = require("./string.gs").testString2;
putAny             = require("./any.gs").putAny;
getAny             = require("./any.gs").getAny;
testAnyNull        = require("./any.gs").testAnyNull;
testAnyEmptyString = require("./any.gs").testAnyEmptyString;
testAnyBoolean     = require("./any.gs").testAnyBoolean;
testAnyNumber      = require("./any.gs").testAnyNumber
getObject          = require("./object.gs").getObject;
putObject          = require("./object.gs").putObject;
testObject         = require("./object.gs").testObject;
testObject1        = require("./object.gs").testObject1;
testObject2        = require("./object.gs").testObject2;
testObject3        = require("./object.gs").testObject3;
putArray           = require("./array.gs").putArray;
getArray           = require("./array.gs").getArray;
testArray1         = require("./array.gs").testArray1;
testArray2         = require("./array.gs").testArray2;

testString1();
testString2();
testAnyNull();
testAnyEmptyString();
testAnyBoolean();
testAnyNumber();
testObject();
testObject1();
testObject2();
testObject3();
testArray1();
testArray2();
testJson();
test1();

console.log("putCount       = " + cache.putCount);
console.log("getCount       = " + cache.getCount);
console.log("removeCount    = " + cache.removeCount);
console.log("putAllCount    = " + cache.putAllCount);
console.log("getAllCount    = " + cache.getAllCount);
console.log("removeAllCount = " + cache.removeAllCount);

function testAll(){
  for(var i in global) {
    if(typeof global[i] !== "object") continue;
    for(var j in global[i]) {
      if(typeof global[i][j] != "function") continue;
      if(j.match(/^testAll$/)) continue;
      if(j.match(/__$/)) continue;
      if(!j.match(/^test/)) continue;
      Logger.log("testAll -> %s.%s", i, j);
      global[i][j]();
      Logger.log("testAll <- %s.%s", i, j);      
    }
  }
}
