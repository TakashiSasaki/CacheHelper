/**
  @param {string} key
  @param {Array} array
  @return {void}
*/
function putArray_(key, array) {
  assert.strictEqual(arguments.length, 2);
  assert(typeof key === "string");
  assert(array instanceof Array);
  this.remove(key);
  this.write(L(key), "" + array.length);
  for(var i=0; i<array.length; ++i) {
    this.put(k = L(key,i), array[i]);
  }//for
}//putArray_

if(typeof exports === "undefined") exports = {};
exports.putArray_ = putArray_;

