if(global.Logger === undefined) global.Logger = console;
LocalCache = require("./emulate.gs").LocalCache;
global.cache = new LocalCache();

getDerivedKeys  = require("./misc.gs").getDerivedKeys;
removeAndPut    = require("./misc.gs").removeAndPut;
merge           = require("./array.gs").merge;
putJson         = require("./json.gs").putJson;
getJson         = require("./json.gs").getJson;
testString      = require("./string.gs").testString;
testAnyNull     = require("./any.gs").testAnyNull;

testString();
testAnyNull();

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
