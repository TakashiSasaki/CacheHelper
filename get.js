function get_(key) {
  get_.count += 1;
  var stringified =  this.storage.get("#" + key + "#");
  if(stringified === null) {
    return getAny(key);
  } else { 
    var keys = JSON.parse(stringified);
    this.prefetched = this.storage.getAll(keys);
    return this.getAny(key);
  } 
}
