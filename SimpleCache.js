function SimpleCache(){
  assert.lengthOf(arguments, 0);
  this.o = {};
  
  this.getAll = function(keys){
    assert.isArray(keys);
    var all = {};
    for(var i in keys) {
      assert.isString(keys[i]);
      all[keys[i]] = this.o[keys[i]];
      if(all[i] === undefined) all[i] = null;
      assert(all[i] === null || typeof all[i] === "string");
    }//for
    return all;
  }//getAll
  
  this.get = function(key){
    assert.isString(key);
    var v = this.o[key];
    if(v === undefined) {
      v = null;
    } else {
      assert.isString(v);
    }//if
    return v;
  }//get
  
  this.putAll = function(object){
    assert.isObject(object);
    for(var i in object){
      this.o[i] = object[i];
      assert.isString(this.o[i]);
    }//for i
  }//putAll
  
  this.removeAll = function(keys){
    assert.isArray(keys);
    for(var i in keys) {
      var key = keys[i];
      assert.isString(key);
      delete this.o[key];
    }//for i
  }//removeAll
}

if(typeof module !== "undefined") module.exports = SimpleCache;

