if(typeof assert === "undefined") assert = require("myassert");

function putArray_(key, array) {
  assert.lengthOf(arguments, 2);
  assert.isString(key);
  assert.isArray(array);
  this.remove(key);
  this.write(L(key), "" + array.length);
  for(var i=0; i<array.length; ++i) {
    this.put(k = L(key,i), array[i]);
  }//for
}//putArray_

function getArray_(key){
  assert.lengthOf(arguments, 1);
  assert.isString(key);
  const stringified = this.read(L(key));
  assert.isString(stringified);
  var length = parseInt(stringified);
  assert(typeof length === "number");
  var array = [];
  for(var i=0; i < length; ++i) {
    array.push(this.get(L(key,i)));
  }
  return array;
}//getArray

if(typeof exports === "undefined") exports = {};
exports.putArray_ = putArray_;
exports.getArray_ = getArray_;

