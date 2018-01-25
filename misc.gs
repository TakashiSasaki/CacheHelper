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

function commit_(all, key){
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
  commit_(all, key);
  return all;
}

function get(key) {
  getCount += 1;
  var jsonString =  cache.get("#" + key + "#");
  if(jsonString === null) {
    Logger.log("get: #" + key + "# not found");
    return getAny(key);
  } else { 
    var keys = JSON.parse(jsonString);
    Logger.log("get: hint found. " + keys);
    var values = cache.getAll(keys);
    return getAny(key, values);
  } 
}

function getDerivedKeys_(key){
  return ["$" + key + "$", "(" + key + ")", "[" + key + "]", "{" + key + "}", "#" + key + "#"];
}

function merge_(o1, o2){
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

function prefetch_(values, keys) {
  if(typeof values === "undefined") values = {};
  if(!(keys instanceof Array)) throw "prefetch_: keys should be an array.";
  for(var i in keys) {
    if(typeof values[keys[i]] === "undefined") {
      prefetchCount += 1;
      var got = cache.getAll(keys);
      for(var j in got) {
        values[j] = got[j];
      }
      return values;
    }
  }
  return values;
}//prefetch_

function prefetchAny_(values, keys) {
  if(typeof values === "undefined") values = {};
  if(!(keys instanceof Array)) throw "prefetchAny_: keys should be an array.";
  var bNeedToGet = false;
  for(var i in keys) {
    if(typeof values["$" + keys[i] + "$"] === "undefined" &&
        typeof values["(" + keys[i] + ")"] === "undefined" &&
        typeof values["{" + keys[i] + "}"] === "undefined" &&
        typeof values["[" + keys[i] + "]"] === "undefined") bNeedToGet = true;
  }
  if(bNeedToGet == false) return values;
  var keysToGet = [];
  for(var j in keys) {
    if(typeof keys[j] !== "string") throw "prefetchAny_: key should be a strign.";
    keysToGet.push(keys[j]);
    keysToGet.push("$" + keys[j] + "$");
    keysToGet.push("$" + keys[j] + "$0");
    keysToGet.push("[" + keys[j] + "]");
    keysToGet.push("[" + keys[j] + "]0");
    keysToGet.push("{" + keys[j] + "}");
    keysToGet.push("(" + keys[j] + ")");
  }
  Logger.log("prefetchAny_: keysToGet = " + keysToGet);
  return prefetch_(values, keysToGet);
}//prefetchAny_


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


if(exports === undefined) exports = {};
exports.getDerivedKeys_= getDerivedKeys_;
exports.commit_        = commit_;
exports.putCount       = putCount;
exports.getCount       = getCount;
exports.prefetchCount  = prefetchCount;
exports.test1          = test1_;
exports.merge_         = merge_;
exports.prefetch_      = prefetch_;
exports.prefetchAny_   = prefetchAny_;
