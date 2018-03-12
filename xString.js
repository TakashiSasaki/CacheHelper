function getString_(key) {
  assert.lengthOf(arguments, 1);
  assert.isString(key);
  var stringified = this.read(S(key));
  assert.isString(stringified);
  var length = parseInt(stringified);
	assert.isInteger(length);
  if(length == 0) return "";

  var fragments = [];
  for(var i=0; i<length; ++i) {
    var fragment = this.read(S(key,i));
    assert.isString(fragment);
    fragments.push(fragment);
  }
  return fragments.join("");
}//getString_

function putString_(key, string) {
  assert.lengthOf(arguments,2);
  assert.isString(key);
  assert.isString(string);
  this.remove(key);
  
  var fragments = [];
  assert(typeof this.maxValueLength === "number" && this.maxValueLength > 0);
  for(var i=0; i<string.length; i += this.maxValueLength) {
    fragments.push(string.substr(i, this.maxValueLength));
  }
  
  this.write(S(key), ""+fragments.length);
  for(var i=0; i<fragments.length; ++i) {
    this.write(S(key,i), fragments[i]);
  }//for
}//putString_

if(typeof exports === "undefined") exports = {};
exports.putString_ = putString_;
exports.getString_ = getString_;

