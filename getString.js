/**
  @param {string} key
  @return {string}
*/
function getString_(key) {
  assert.strictEqual(arguments.length,1);
  assert(typeof key === "string");
  var stringified = this.read(S(key));
  assert(typeof stringified === "string");
  var length = parseInt(stringified);
  assert(typeof length === "number" && length === Math.floor(length) && length === Math.ceil(length));
  if(length == 0) return "";

  var fragments = [];
  for(var i=0; i<length; ++i) {
    var fragment = this.read(S(key,i));
    assert(typeof fragment === "string");
    fragments.push(fragment);
  }
  return fragments.join("");
}//getString_

if(typeof exports === "undefined") exports = {}
exports.getString_ = getString_;

