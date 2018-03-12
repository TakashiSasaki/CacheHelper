/**
 * @param {string} key
 * @param {array} array
*/
function appendArray_(key, array) {
  assert.strictEqual(arguments.length,2);
  assert.isString(key);
  assert.isArray(array);
  var currentLength = parseInt(this.read(L(key)));
  assert(typeof currentLength === "number" && currentLength === Math.floor(currentLength) && Math.ceil(currentLength));
  for(var i=0; i<array.length; ++i) {
    this.put(L(key, currentLength + i), array[i]);
  }//for i
  this.write(L(key), "" + (currentLength + array.length));
}//appendArray

if(typeof exports === "undefined") exports = {};
exports.appendArray_ = appendArray_;
