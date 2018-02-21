if(global.Logger === undefined) global.Logger = console;
LocalCache = require("./emulate.js").LocalCache;
global.cache = new LocalCache();


// require all depencencies
(function(x){
  for(var i in x) {
    var m = require(x[i]);
    for(var j in m) {
      global[j] = m[j];
    }
  }
})(["./misc.js", "./array.js", "./json.js", "./string.js", "./any.js", "./object.js", "./array.js"])


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

resetStringCount();
resetArrayCount();
resetObjectCount();
resetJsonCount();
resetAnyCount();
cache.resetCount();
console.log("prefetchCount = " + prefetchCount);
test1();
console.log("prefetchCount = " + prefetchCount);

cache.showCount();
showStringCount();
showArrayCount();
showObjectCount();
showJsonCount();
showAnyCount();

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
