function GasCache(cache, expirationInSeconds){
	var assert = require("myassert");
  assert(typeof cache === "object");
  assert.isInteger(expirationInSeconds);

  this.cache = cache;
  this.expirationInSeconds = expirationInSeconds;

  this.getAll = function(keys){
    assert.isArray(keys);
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
    assert.isArray(keys);
    return this.cache.removeAll(keys);
  };
}//GasCache

function UserCache(expirationInSeconds) {
	var assert = require("myassert");
  assert.isPositiveInteger(expirationInSeconds);
  var cache = CacheService.getUserCache();
  assert(typeof cache === "object");
  var gasCache = new GasCache(cache, expirationInSeconds);
  return gasCache;
}//UserCache


function ScriptCache(expirationInSeconds) {
	var assert = require("myassert");
  assert.isPositiveInteger(expirationInSeconds);
  var cache = CacheService.getScriptCache();
  assert(typeof cache === "object");
  var gasCache = new GasCache(cache, expirationInSeconds);
  return gasCache;
}//ScriptCache

if(typeof exports === "undefined") exports = {};
exports.UserCache = UserCache;
exports.ScriptCache = ScriptCache;

