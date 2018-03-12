/**
  @param {string} key
  @param {object} object
  @return {void}
*/
function putObject_(key, object) {
  assert.strictEqual(arguments.length, 2);
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

if(typeof exports === "undefined") exports = {};
exports.putObject_ = putObject_;

