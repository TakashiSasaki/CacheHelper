if(global === undefined) global = this;
if(global.cache === undefined) global.cache = CacheService.getScriptCache();

/**
  set cache. Default is scirpt cache.
  @param cache {Cache}
  @return {void}
*/
function setCache(cache) {
  global.cache = cache;
}

function removeAndPut(all, key){
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
  var all = putAny(key, any);
  if(!(all instanceof Object)) throw "put: !(all instanceof Object).";
  removeAndPut(all, key);
  return all;
}

function get(key) {
  var keys = JSON.parse(cache.get("#" + key + "#"));
  var values = cache.getAll(keys);
  return getAny(key, values);
}

function getDerivedKeys(key){
  return ["$" + key + "$", "(" + key + ")", "[" + key + "]", "{" + key + "}", "#" + key + "#"];
}

function appendDerivedKeys(array, key){
  var keys = getDerivedKeys(key);
  Array.prototype.push.apply(array, keys);
  return array;
}

if(exports === undefined) exports = {};
exports.getDerivedKeys = getDerivedKeys;
exports.removeAndPut = removeAndPut;
