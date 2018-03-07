//class KeyValueStore
function KeyValueStore(storage){
  if(typeof CacheService !== typeof undefined){
    this.storage = CacheService.getScriptCache();
  }
  this.nMaxValueLength = 50000;
  this.merge = merge_;
  this.getAny = getAny_;
  this.putAny = putAny_;
  this.getJson = getJson_;
  this.putJson = putJson_;
  this.putObject = putObject_;
  this.putString = putString_;
  this.getString = getString_;
  this.prefetch = prefetch_;
  this.put = put_;
  this.get = get_;

  this.reset = function(){
    this.transaction = {};
    this.prefetched = {};
    this.putAny.count = 0;
    this.getAny.count = 0;
    this.get.count = 0;
    this.put.count = 0;
    this.prefetch.count = 0;
  }
  this.reset();
  
  this.showCount = function(){
    console.log("putAny.count = " + this.putAny.count);
    console.log("getEny.coutn = " + this.getAny.count);
  }
}//KeyValueStore
