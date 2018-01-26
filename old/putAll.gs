/**
  @param {Cache} cache CacheService.getUserCache(), CacheService.getDocumentCache() or CacheService.getScriptCache() or undefined
  @param {Any[]} anyArray
  @param {String[]=} keyStringArray, optional
  @returns {String[]} Array of key strings
*/
function putAll(cache, anyArray, keyStringArray){
  if(!isJavaObject_(cache)) cache = CacheService.getScriptCache();
  if(!anyArray instanceof Array) throw new Error("objectArray should be an array.");
  if(keyStringArray === undefined) keyStringArray = new Array(anyArray.length);
  if(!keyStringArray instanceof Array) throw new Error("keyStringArray should be an array of strings.");
  if(anyArray.length !== keyStringArray.length) throw new Error("both length of objectArray and keyStringArray should be the same.");
  var kv = {};
  for(var i in anyArray){
    var jsonString = JSON.stringify(anyArray[i]);
    var keyString = keyStringArray[i];
    if(keyString === undefined) {
      var keyString = Hash.hashAnyIntoBase64(anyArray[i]);
      keyStringArray[i] = keyString;
    }
    kv[keyString] = jsonString;
  }
  if(Object.keys(kv).length !== anyArray.length) throw new Error("duplicate keys exist");
  cache.putAll(kv, cacheTimeout);
  return keyStringArray;
}

/**
  @param {Cache} cache CacheService.getUserCache(), CacheService.getDocumentCache() or CacheService.getScriptCache() or undefined
  @param {String[]} keyStringArray
  @return {Any[]} Array of objects
*/
function getAll(cache, keyStringArray) {
  if(!isJavaObject_(cache)) cache = CacheService.getScriptCache();
  if(!keyStringArray instanceof Array) throw new Error("keyStringArray should be an array");
  var objects = [];
  var jsonStrings = cache.getAll(keyStringArray);
  for(var i in keyStringArray) {
    var key = keyStringArray[i];
    var jsonString = jsonStrings[key];
    var object = JSON.parse(jsonString);
    objects.push(object);
  }
  return objects;
}

function testPutAllNull(){
  var keys = putAll(undefined, [null]);
  var got = getAll(undefined, keys);
  if(got.length !== 1) throw new Error();
  if(got[0] !== null) throw new Error();
}

function testPutAllEmptyString(){
  var keys = putAll(undefined, [""]);
  var got = getAll(undefined, keys);
  if(got.length !== 1) throw new Error();
  if(got[0] !== "") throw new Error();
}

function testPutAllBoolean(){
  var keys = putAll(undefined, [false,true]);
  var got = getAll(undefined, keys);
  if(got.length !== 2) throw new Error();
  if(got[0] !== false) throw new Error();
  if(got[1] !== true) throw new Error();
}


function testPutAll1__(){
  var o1 = {
    aaa: 111,
    name: "o1"
  };
  var o2 = {
    bbb: 222,
    name: "o2"
  };
  var keys = putAll(undefined, [o1, o2]);
  var objects = getAll(undefined, keys);
  if(JSON.stringify(objects) !== JSON.stringify([o1,o2])) throw new Error();
}

function testPutAll2__(){
  var o1 = {
    aaa: 111,
    name: "o1"
  };
  var o2 = {
    bbb: 222,
    name: "o2"
  };
  var objects = [o1,o2];
  var keys = ["key1", "key2"];
  putAll(undefined, objects, keys);
  var gotObjects = getAll(undefined, keys);
  if(JSON.stringify(objects) != JSON.stringify(gotObjects)) throw new Error ("objcts and gotObjects is not identical.");
}

function testPutAll3__(){
  var keys = putAll(undefined, []);
  var values = getAll(undefined, keys);
  if(keys.length !== 0) throw new Error();
  if(values.length !== 0) throw new Error();
}

function testPutAll4__(){
  var keys = putAll(undefined, [1,2,3],["a","b","c"]);
  if(JSON.stringify(keys) !== JSON.stringify(["a","b","c"])) throw new Error();
  var values = getAll(undefined, ["a","b","c"]);
  if(JSON.stringify(values) !== JSON.stringify([1,2,3])) throw new Error();
}

function testPutAll_(){
  testPutAll1__();
  testPutAll2__();
  testPutAll3__();
  testPutAll4__();
}