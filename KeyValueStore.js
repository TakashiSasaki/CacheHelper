//class KeyValueStore
function KeyValueStore(storage){
  if(typeof CacheService !== typeof undefined){
    this.storage = CacheService.getScriptCache();
  }
  
  this.merge = merge_;
  this.getAny = getAny_;
  this.putAny = putAny_;
  this.getJson = getJson_;
  this.putJson = putJson_;
  this.putObject = putObject_;
  this.getObject = getObject_;
  this.putString = putString_;
  this.getString = getString_;
  this.prefetch = prefetch_;

  this.put = function(key, any) {
    assert.strictEqual(typeof key, "string");
    assert(any !== undefined);
    this.put.count += 1;
    this.putAny(key, any);
    var keys = Object.keys(this.transaction);
    this.transaction["#" + key + "#"] = JSON.stringify(keys);
    if(typeof this.transaction["TO BE REMOVED"] !== "undefined") {
      this.storage.removeAll(this.transaction["TO BE REMOVED"]);
      delete this.transaction["TO BE REMOVED"];
    }
    this.storage.putAll(this.transaction);
  }//put

  this.get = function(key) {
    this.get.count += 1;
    var stringified =  this.storage.get("#" + key + "#");
    if(stringified === null) {
      return getAny(key);
    } else { 
      var keys = JSON.parse(stringified);
      this.prefetched = this.storage.getAll(keys);
      return this.getAny(key);
    }//if
  }//get

  this.reset = function(){
    this.nMaxValueLength = 50000;
    this.transaction = {};
    this.prefetched = {};
    this.putAny.count = 0;
    this.getAny.count = 0;
    this.get.count = 0;
    this.put.count = 0;
    this.prefetch.count = 0;
  }

  this.reset();
  return this;
}//KeyValueStore
