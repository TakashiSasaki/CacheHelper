/**
 * @param {stirng} key
 * @return {Array}
 */
function getArray_(key){
  assert.strictEqual(arguments.length, 1);
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
exports.getArray_ = getArray_;

