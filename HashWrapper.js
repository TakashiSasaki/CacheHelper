if(typeof process !== "undefined") {
  var modules = [
    "JOLSH",
    "xObject",
    "xJson",
    "xString", 
    "xArray",
    "setProperty_",
    "appendArray_",
  ];
  for(var i in modules) {
    var module = require("./" + modules[i]);
    for(var j in module) {
      if(typeof module[j] === "function") {
        global[j] = module[j];
        console.log("importing " + j + " from " + modules[i]);
      }
    }//for j
  }//for i
}

function HashWrapper(cache, maxValueLength){
	var assert = require("myassert");
  assert.isNotUndefined(cache);
  assert.isPositiveInteger(maxValueLength);

  this.cache = cache;
  this.maxValueLength = maxValueLength;
  
  this.appendArray = appendArray_;
  this.appendObject = appendObject_;
  this.setProperty = setProperty_;
  this.getArray = getArray_;
  this.putArray = putArray_;
  this.getJson = getJson_;
  this.putJson = putJson_;
  this.putObject = putObject_;
  this.getObject = getObject_;
  this.isObject = isObject_;
  this.putString = putString_;
  this.getString = getString_;

  this.put = function(key, any) {
    assert.isString(key);
    assert.isNotUndefined(any);
    if(typeof any === "string") {
      this.putString(key, any);
    } else if(any === null || typeof any === "boolean" || typeof any === "number") {
      this.putJson(key,any);
    } else if(any instanceof Array) {
      this.putArray(key, any);
    } else if(any instanceof Object) {
      this.putObject(key, any);
    } else {
      throw "HashWrapper#put: unexpected type of value. " + typeof any;
    }
  };//put
  
  this.fetch = function(){
    var keysToRead = [];
    for(var k in this.readBuffer){
      if(this.readBuffer[k] === undefined) {
        keysToRead.push(k);
        delete this.readBuffer[k];
      }
    }//for
    if(keysToRead.length > 0) {
      this.getAllCount += 1;
      var x = this.cache.getAll(keysToRead);
      assert(x instanceof Object);
      for(var l in x) {
        this.readBuffer[l] = x[l];
      }//for l
    }//if
  };//fetch

  this.commit = function(key){
    var keysToRemove = [];
    for(var i in this.writeBuffer){
      if(this.writeBuffer[i] === undefined) {
        keysToRemove.push(i);
        delete this.writeBuffer[i];
        delete this.readBuffer[i];
      }
    }// for i
    if(keysToRemove.length > 0) {
      this.removeAllCount += 1;
      this.cache.removeAll(keysToRemove);
    }
    
    if(typeof key === "string") {
      assert.isUndefined(this.writeBuffer[H(key)]);
      const writeBufferKeys = Object.keys(this.writeBuffer);
      assert.isArray(writeBufferKeys);
      if(writeBufferKeys.length > 0) {
        this.writeBuffer[H(key)] = JSON.stringify(writeBufferKeys);
      }//if
    }//if
    
    this.putAllCount += 1;
    this.cache.putAll(this.writeBuffer);
    for(var j in this.writeBuffer){
      this.readBuffer[j] = this.writeBuffer[j];
    }// for j
  };//commit

  this.get = function(key) {
    assert.isString(key);
    if(this.readBuffer[key]    === undefined && 
       this.readBuffer[S(key)] === undefined &&
       this.readBuffer[L(key)] === undefined &&
       this.readBuffer[O(key)] === undefined &&
       this.readBuffer[J(key)] === undefined) 
    {
       this.readBuffer[key]      = undefined;
       this.readBuffer[H(key)]   = undefined;
       this.readBuffer[S(key)]   = undefined; 
       this.readBuffer[S(key,0)] = undefined;
       this.readBuffer[S(key,1)] = undefined;
       this.readBuffer[S(key,2)] = undefined;
       this.readBuffer[S(key,3)] = undefined;
       this.readBuffer[S(key,4)] = undefined;
       this.readBuffer[L(key)]   = undefined;
       this.readBuffer[L(key,0)] = undefined;
       this.readBuffer[L(key,1)] = undefined;
       this.readBuffer[L(key,2)] = undefined;
       this.readBuffer[L(key,3)] = undefined;
       this.readBuffer[L(key,4)] = undefined;
       this.readBuffer[O(key)]   = undefined;
       this.readBuffer[J(key)]   = undefined;
       this.fetch();
    }//if

    if(typeof this.readBuffer[H(key)] === "string") {
      var parsed = JSON.parse(this.readBuffer[H(key)]);
      for(var i in parsed) {
        if(this.readBuffer[parsed[i]] === undefined) {
          this.readBuffer[parsed[i]] = undefined;
        }
      }//for i
      this.fetch();
    }
    
    if(typeof this.readBuffer[S(key)] === "string") {
      return this.getString(key);
    } else if(typeof this.readBuffer[J(key)] === "string") {
      return this.getJson(key);
    } else if(typeof this.readBuffer[L(key)] === "string") {
      return this.getArray(key);
    } else if(typeof this.readBuffer[O(key)] === "string") {
      return this.getObject(key);
    } else {
      throw "HashWrapper#get: key " + key + " not found in readBuffer.";
    }
  }//get

  this.remove = function(keys){
    assert.lengthOf(arguments, 1);
    for(var i in keys) {
      assert.isString(keys[i]);
      this.writeBuffer[S(keys[i])] = undefined;
      this.writeBuffer[J(keys[i])] = undefined;
      this.writeBuffer[L(keys[i])] = undefined;
      this.writeBuffer[O(keys[i])] = undefined;
      this.writeBuffer[H(keys[i])] = undefined;
      delete this.readBuffer[S(keys[i])];
      delete this.readBuffer[J(keys[i])];
      delete this.readBuffer[L(keys[i])];
      delete this.readBuffer[O(keys[i])];
      delete this.readBuffer[H(keys[i])];
    }//for i
  };

  this.write = function(key, value){
    assert.isString(key);
    assert.isNotUndefined(value);
    this.writeBuffer[key] = value;
    this.readBuffer[key] = value;
  };//write
  
  this.read = function(key) {
    assert.lengthOf(arguments, 1);
    assert.isString(key);
    if(this.readBuffer[key] === undefined) {
      this.getCount += 1;
      this.readBuffer[key] = this.cache.get(key);
      if(this.readBuffer[key] === null) this.readBuffer[key] = undefined;
    }
    return this.readBuffer[key];
  };//read

  this.exist = function(key) {
    assert.isString(key);
    return typeof this.readBuffer[key] === "string";
  };// exist
  
  this.reset = function(){
    this.writeBuffer = {};
    this.readBuffer = {};
    this.getAllCount = 0;
    this.putAllCount = 0;
    this.removeAllCount = 0;
    this.getCount = 0;
  };
  
  this.roundtripTest = function(key,value){
    this.reset();
    this.put(key, value);
    this.commit(key);
    assert.equal(this.putAllCount, 1);
    assert(this.removeAllCount <=1);
    assert.equal(this.getAllCount, 0);
    assert.equal(this.getCount, 0);
    this.reset();
    assert.deepStrictEqual(this.get(key), value);
    assert.equal(this.putAllCount, 0);
    assert.equal(this.removeAllCount, 0);
    assert(this.getAllCount <= 2);
    assert.equal(this.getCount, 0);
  };
  
  this.reset();
  return this;
}//HashWrapper

//if(typeof module !== "undefined") module.exports = HashWrapper;
if(typeof exports === "undefined") exports = {};
exports.HashWrapper = HashWrapper;
//exports.assert = require("myassert");
