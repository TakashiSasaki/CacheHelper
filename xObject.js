function getObject_(key) {
	var assert = require("myassert");
  assert.lengthOf(arguments, 1);
  assert.isString(key);

  var stringified = this.read(O(key));
  var properties = JSON.parse(stringified);
  assert.isArray(properties);

  var object = {};
  for(var i=0; i<properties.length; ++i) {
    assert.isString(properties[i]);
    object[properties[i]] = this.get(O(key,properties[i]));
    assert.isNotUndefined(object[properties[i]]);
  }//for i
  
  assert.strictEqual(Object.keys(object).length, properties.length);
  
  return object;
}//getObject_

function putObject_(key, object) {
	var assert = require("myassert");
  assert.lengthOf(arguments, 2);
  assert.isString(key);
  assert.isObject(object);
  
  this.remove(key);
  this.write(O(key), JSON.stringify(Object.keys(object)));
  for(var i in object) {
    assert.isString(i);
    this.put(O(key,i), object[i]);
  }  
  assert.isString(this.readBuffer[O(key)]);
  assert(this.isObject(key));
}//putObject_

function isObject_(key){
	var assert = require("myassert");
  assert.lengthOf(arguments, 1);
  assert.isString(key);
  if(!this.exist(O(key))) {
    assert.isUndefined(this.readBuffer[O(key)]);
    return false;
  }//if
  assert(!this.exist(S(key)));
  assert(!this.exist(J(key)));
  assert(!this.exist(L(key)));
  assert.isString(this.readBuffer[O(key)]);
  return true;
}//isObject_

function appendObject_(key, object){
	var assert = require("myassert");
  assert.lengthOf(arguments, 2);
  assert.isString(key);
  assert.isObject(object);
  
  for(var i in object){
    this.appendValue(key, i, object[i]);
  }//for i
  
  this.write(O(key), JSON.stringify(properties));
}//appendObject_

if(typeof exports === "undefined") exports = {};
exports.appendObject_ = appendObject_;
exports.getObject_  = getObject_;
exports.putObject_ = putObject_;
exports.isObject_ = isObject_;
