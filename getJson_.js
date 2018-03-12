/**
  @param {string} key
  @return {null|boolean|number}
*/
function getJson_(key){
  assert.strictEqual(arguments.length, 1);
  assert.isString(key);
  if(this.read(J(key)) === "LONG JSON STRING") {
    var x = JSON.parse(this.getString(J(key)));
  } else {
    var x = JSON.parse(this.read(J(key)));
  }
  assert(x === null || typeof x === "number" || typeof x === "boolean");
  return x;
}//getJson_

if(typeof exports === "undefined") exports = {};
exports.getJson_ = getJson_;

