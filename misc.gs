putCount = 0;
getCount = 0;
prefetchCount = 0;

if(typeof global === "undefined") global = this;
if(global.cache === undefined) global.cache = CacheService.getScriptCache();

/**
  set cache. Default is scirpt cache.
  @param cache {Cache}
  @return {void}
*/
function setCache(cache) {
  global.cache = cache;
}

function commit(all, key){
  cache.removeAll(all["TO BE REMOVED"]);
  delete all["TO BE REMOVED"];
  if(typeof key === "string") {
    all["#" + key + "#"] = JSON.stringify(Object.keys(all))
  }
  cache.putAll(all);
}

function put(key, any) {
  if(typeof key !== "string") throw "put: expects string key.";
  if(any === undefined) throw "put: undefined is given as a value";
  putCount += 1;
  var all = putAny(key, any);
  if(!(all instanceof Object)) throw "put: !(all instanceof Object).";
  var keys = Object.keys(all);
  all["#" + key + "#"] = JSON.stringify(keys);
  commit(all, key);
  return all;
}

function get(key) {
  getCount += 1;
  var jsonString =  cache.get("#" + key + "#");
  if(jsonString === null) {
    return getAny(key);
  } else { 
    var keys = JSON.parse(jsonString);
    var values = cache.getAll(keys);
    return getAny(key, values);
  } 
}

function getDerivedKeys(key){
  return ["$" + key + "$", "(" + key + ")", "[" + key + "]", "{" + key + "}", "#" + key + "#"];
}

function appendDerivedKeys(array, key){
  var keys = getDerivedKeys(key);
  Array.prototype.push.apply(array, keys);
  return array;
}

function merge(o1, o2){
  var remove1 = o1["TO BE REMOVED"];
  var remove2 = o2["TO BE REMOVED"];
  if(remove1 === undefined) remove1 = [];
  if(remove2 === undefined) remove2 = [];
  Array.prototype.push.apply(remove1, remove2);
  for(var i in o2) {
    o1[i] = o2[i];
  }
  o1["TO BE REMOVED"] = remove1;
  return o1;
}

function prefetchAny(values, keys) {
  if(!(values instanceof Object)) values = {};
  if(!(keys instanceof Array)) throw "prefetchAny: keys should be an array.";
  var bNeedToGet = false;
  for(var i in keys) {
    if(typeof values[keys[i]] === "undefined") bNeedToGet = true;
    if(typeof values["$" + keys[i] + "$"] === "undefined" &&
        typeof values["(" + keys[i] + ")"] === "undefined" &&
        typeof values["{" + keys[i] + "}"] === "undefined" &&
        typeof values["[" + keys[i] + "]"] === "undefined") bNeedToGet = true;
  }
  if(bNeedToGet == false) return values;
  var keysToGet = [];
  for(var j in keys) {
    if(typeof keys[j] !== "string") throw "prefetchAny: key should be a strign.";
    keysToGet.push(keys[j]);
    keysToGet.push("$" + keys[j] + "$");
    keysToGet.push("$" + keys[j] + "$0");
    keysToGet.push("[" + keys[j] + "]");
    keysToGet.push("[" + keys[j] + "]0");
    keysToGet.push("{" + keys[j] + "}");
    keysToGet.push("(" + keys[j] + ")");
  }
  prefetchCount += 1;
  var fetched = cache.getAll(keysToGet);
  for(var k in fetched) {
    values[k] = fetched[k];
  }
  return values;
}//prefetchAny


function test1(){
  Logger.log("test1: begin");
  var o = {
    a : 1,
    b: null,
    c: false,
    d: [ "hello", 1.23, null]
  }
  var all = put("test1", o);
  Logger.log(all);
  if(JSON.stringify(o) !== JSON.stringify(get("test1"))) throw "test1: o != get(\"test1\").";
  Logger.log("test1: end");
}


if(exports === undefined) exports = {};
exports.getDerivedKeys = getDerivedKeys;
exports.commit         = commit;
exports.putCount       = putCount;
exports.getCount       = getCount;
exports.prefetchCount  = prefetchCount;
exports.test1          = test1;
exports.merge          = merge;
exports.prefetchAny    = prefetchAny;
