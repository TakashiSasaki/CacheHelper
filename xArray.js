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
  }//for i
  return array;
}//getArray_

function appendArray_(key, array) {
  assert.lengthOf(arguments, 2);
  assert.isString(key);
  assert.isArray(array);
  var currentLength = parseInt(this.read(L(key)));
  assert(typeof currentLength === "number" && currentLength === Math.floor(currentLength) && Math.ceil(currentLength));
  for(var i=0; i<array.length; ++i) {
    this.put(L(key, currentLength + i), array[i]);
  }//for i
  this.write(L(key), "" + (currentLength + array.length));
}//appendArray_

if(typeof exports === "undefined") exports = {};
exports.putArray_ = putArray_;
exports.getArray_ = getArray_;
exports.appendArray_ = appendArray_;

