//class LazyKeyValueStore
function LazyKeyValueStore(storage, maxValueLength){
  if(storage === undefined) {
    if(typeof CacheService !== typeof undefined){
      this.storage = CacheService.getScriptCache();
    }
  } else {
    this.storage = storage;
  }
  if(maxValueLength === undefined) {
    this.maxValueLength = 10;
  } else {
    this.maxValueLength = maxValueLength;
  }
  
  this.appendArray = appendArray_;
  this.getArray = getArray_;
  this.putArray = putArray_;
  this.getJson = getJson_;
  this.putJson = putJson_;
  this.putObject = putObject_;
  this.getObject = getObject_;
  this.putString = putString_;
  this.getString = getString_;

  this.put = function(key, any) {
    assert(typeof key === "string");
    assert(any !== undefined);
    if(typeof any === "string") {
      this.putString(key, any);
    } else if(any === null || typeof any === "boolean" || typeof any === "number") {
      this.putJson(key,any);
    } else if(any instanceof Array) {
      this.putArray(key, any);
    } else if(any instanceof Object) {
      this.putObject(key, any);
    } else {
      throw "LazyKeyValueStore#put: unexpected type of value. " + typeof any;
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
      var x = this.storage.getAll(keysToRead);
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
      this.storage.removeAll(keysToRemove);
    }
    
    if(typeof key === "string") {
      assert(this.writeBuffer["#" + key + "#"] === undefined);
      const writeBufferKeys = Object.keys(this.writeBuffer);
      assert(writeBufferKeys instanceof Array);
      if(writeBufferKeys.length > 0) {
        this.writeBuffer["#" + key + "#"] = JSON.stringify(writeBufferKeys);
        this.putAllCount += 1;
        this.storage.putAll(this.writeBuffer);
        for(var j in this.writeBuffer){
          this.readBuffer[j] = this.writeBuffer[j];
        }// for j
      }
    }//if
  };//commit

  this.get = function(key) {
    assert(typeof key === "string");
    if(this.readBuffer[key]             === undefined && 
       this.readBuffer[S(key)] === undefined &&
       this.readBuffer["[" + key + "]"] === undefined &&
       this.readBuffer["{" + key + "}"] === undefined &&
       this.readBuffer["(" + key + ")"] === undefined) 
    {
       this.readBuffer[key]              = undefined;
       this.readBuffer["#" + key + "#"]  = undefined;
       this.readBuffer[S(key)]  = undefined; 
       this.readBuffer[S(key,0)] = undefined;
       this.readBuffer["[" + key + "]"]  = undefined;
       this.readBuffer["[" + key + "]0"] = undefined;
       this.readBuffer["{" + key + "}"]  = undefined;
       this.readBuffer["(" + key + ")"]  = undefined;
       this.fetch();
    }//if

    if(typeof this.readBuffer["#" + key + "#"] === "string") {
      var parsed = JSON.parse(this.readBuffer["#" + key + "#"]);
      for(var i in parsed) {
        if(this.readBuffer[parsed[i]] === undefined) {
          this.readBuffer[parsed[i]] = undefined;
        }
      }//for i
      this.fetch();
    }
    
    if(typeof this.readBuffer[S(key)] === "string") {
      return this.getString(key);
    } else if(typeof this.readBuffer["(" + key + ")"] === "string") {
      return this.getJson(key);
    } else if(typeof this.readBuffer["[" + key + "]"] === "string") {
      return this.getArray(key);
    } else if(typeof this.readBuffer["{" + key + "}"] === "string") {
      return this.getObject(key);
    } else {
      throw "LazyKeyValueStore#get: key " + key + " not found in readBuffer.";
    }
  }//get

  this.remove = function(keys){
    for(var i in keys) {
      assert(typeof keys[i] === "string");
      this.writeBuffer[keys[i]] = undefined;
      this.writeBuffer[S(keys[i])] = undefined;
      this.writeBuffer["(" + keys[i] + ")"] = undefined;
      this.writeBuffer["[" + keys[i] + "]"] = undefined;
      this.writeBuffer["{" + keys[i] + "}"] = undefined;
      this.writeBuffer["#" + keys[i] + "#"] = undefined;
      delete this.readBuffer[keys[i]];
      delete this.readBuffer[S(keys[i])];
      delete this.readBuffer["(" + keys[i] + ")"];
      delete this.readBuffer["[" + keys[i] + "]"];
      delete this.readBuffer["{" + keys[i] + "}"];
      delete this.readBuffer["#" + keys[i] + "#"];
    }//for i
  };

  this.write = function(key, value){
    assert(typeof key === "string");
    assert(value !== undefined);
    this.writeBuffer[key] = value;
    this.readBuffer[key] = value;
  };//write
  
  this.read = function(key) {
    assert(typeof key === "string");
    if(this.readBuffer[key] === undefined) {
      this.getCount += 1;
      this.readBuffer[key] = this.storage.get(key);
      if(this.readBuffer[key] === null) this.readBuffer[key] = undefined;
    }
    return this.readBuffer[key];
  };//read
  
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
    assert(this.putAllCount === 1);
    assert(this.removeAllCount === 0);
    assert(this.getAllCount === 0);
    assert(this.getCount === 0);
    this.reset();
    assert.deepStrictEqual(this.get(key), value);
    assert(this.putAllCount === 0);
    assert(this.removeAllCount === 0);
    Logger.log("get(" + key + ") " 
                + "getAllCount:" + (this.getAllCount)
                + " getCount:" + (this.getCount));
  };
  
  this.reset();
  return this;
}//LazyKeyValueStore

function H(key) {  // generate hint-key
  assert(typeof key === "string");
  return "#" + key + "#";
}

function S(key, i) {  // generate string-key
  assert(typeof key === "string");
  assert(i === undefined || typeof i === "number");
  if(i === undefined) return "$" + key + "$";
  return "$" + key + "$" + i;
}
