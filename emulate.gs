function LocalCache() {
  this.cache = {};
  this.getCount = 0;
  this.getAllCount = 0;
  this.putCount = 0;
  this.putAllCount = 0;
  this.removeCount = 0;
  this.removeAllCount = 0;
  
  this.get = function(key) {
    this.getCount += 1;
    var value = this.cache[key];
    if(value === undefined) return null;
    return value;
  }
  
  this.put = function(key, value) {
    this.putCount += 1;
    this.cache[key] = value;
  }
  
  this.getAll = function(keys) {
    this.getAllCount += 1;
    var getCount = this.getCount;
    var result = {};
    for(var i in keys) {
      var key = keys[i];
      result[key] = this.get(key);
    }
    this.getCount = getCount;
    return result;
  }
  
  this.putAll = function(values) {
    this.putAllCount += 1;
    var putCount = this.putCount;
    for(var i in values) {
      this.put(i, values[i]);
    }
    this.putCount = putCount;
  }
  
  this.remove = function(key) {
    this.removeCount += 1;
    delete this.cache[key];
  }
  
  this.removeAll = function(keys) {
    this.removeAllCount += 1;
    var removeCount = this.removeCount;
    for(var i in keys) {
      var key = keys[i];
      this.remove(key);
    }
    this.removeCount = removeCount;
  }
}//LocalCache

if(exports === undefined) exports = {};
exports.LocalCache = LocalCache;

