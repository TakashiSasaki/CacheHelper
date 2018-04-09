
function GasCache(cache, expirationInSeconds){
	var assert = require("myassert");
  assert.isInstanceOf(cache, "Cache");
  assert.isInteger(expirationInSeconds);

  this.cache = cache;
  this.expirationInSeconds = expirationInSeconds;

  this.getAll = function(keys){
    assert.isStringArray(keys);
    return this.cache.getAll(keys);
  };

  this.get = function(key){
    assert.isStirng(key);
    return this.cache.get(key);
  };

  this.putAll = function(values){
    assert.isObject(values);
    return this.cache.putAll(values, this.expirationInSeconds);
  };

  this.removeAll = function(keys){
    assert.isStringArray(keys);
    return this.cache.removeAll(keys);
  };
}//GasCache

function UserCache(expirationInSeconds) {
	var assert = require("myassert");
  assert.isPositiveInteger(expirationInSeconds);
  var cache = CacheService.getUserCache();
  assert.isInstanceOf(cache, "Cache");
  var gasCache = new GasCache(cache, expirationInSeconds);
  return gasCache;
}//UserCache


function ScriptCache(expirationInSeconds) {
	var assert = require("myassert");
  assert.isPositiveInteger(expirationInSeconds);
  var cache = CacheService.getScriptCache();
  assert.isInstanceOf(cache, "Cache");
  var gasCache = new GasCache(cache, expirationInSeconds);
  return gasCache;
}//ScriptCache

