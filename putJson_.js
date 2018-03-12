/**
  @param {string} key
  @param {Any} any
  @return {void}
*/
function putJson_(key, any) {
  assert.strictEqual(arguments.length, 2);
  assert.isString(key);
  assert.isNotUndefined(any);
  this.remove(key);
  var stringified = JSON.stringify(any);
  if(stringified.length > this.maxValueLength){
    this.write(J(key), "LONG JSON STRING");
    this.putString(J(key), stringified);
  } else {
    this.write(J(key), stringified);
  }
}//putJson_

if(typeof exports === "undefined") exports = {};
exports.putJson_ = putJson_;
