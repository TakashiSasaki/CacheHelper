function LocalCache() {
  this.cache = {};
  
  this.get = function(key) {
    var value = this.cache[key];
    if(value === undefined) return null;
    return value;
  }
  
  this.put = function(key, value) {
    this.cache[key] = value;
  }
  
  this.getAll = function(keys) {
    var result = {};
    for(var i in keys) {
      var key = keys[i];
      result[key] = this.get(key);
    }
    return result;
  }
  
  this.putAll = function(values) {
    for(var i in values) {
      this.put(i, values[i]);
    }
  }
  
  this.remove = function(key) {
    delete this.cache[key];
  }
  
  this.removeAll = function(keys) {
    for(var i in keys) {
      var key = keys[i];
      this.remove(key);
    }
  }
}//LocalCache

if(exports === undefined) exports = {};
exports.LocalCache = LocalCache;

