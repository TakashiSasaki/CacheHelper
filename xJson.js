function getJson_(key){
  assert.lengthOf(arguments, 1);
  assert.isString(key);
  if(this.read(J(key)) === "LONG JSON STRING") {
    var x = JSON.parse(this.getString(J(key)));
  } else {
    var x = JSON.parse(this.read(J(key)));
  }
  assert(x === null || typeof x === "number" || typeof x === "boolean");
  return x;
}//getJson_

function putJson_(key, any) {
  assert.lengthOf(arguments, 2);
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
exports.getJson_ = getJson_;
