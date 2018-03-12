function isObject_(key){
  assert.strictEqual(arguments.length, 1);
  assert.strictEqual(typeof key, "string");
  if(!this.exist(O(key))) {
    assert.strictEqual(this.readBuffer[O(key)], "undefined");
    return false;
  }//if
  assert(!this.exist(S(key)));
  assert(!this.exist(J(key)));
  assert(!this.exist(L(key)));
  assert.strictEqual(typeof this.readBuffer[O(key)], "string");
  return true;
}//isObject_

if(typeof exports === "undefined") exports = {};
exports.isObject_ = isObject_;

