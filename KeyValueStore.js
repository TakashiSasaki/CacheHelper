//class KeyValueStore
function KeyValueStore(){
  this.getAny = getAny_;
  this.putAny = putAny_;
  this.prefetch = prefetch_;

  this.reset = function(){
    this.transaction = {};
    this.prefetched = {};
    this.putAny.count = 0;
    this.getAny.count = 0;
  }
  this.reset();
  
  this.showCount = function(){
    console.log("putAny.count = " + this.putAny.count);
    console.log("getEny.coutn = " + this.getAny.count);
  }
}//KeyValueStore
  
