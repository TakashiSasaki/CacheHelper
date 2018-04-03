/**
  @param {string} key
  @return {null|boolean|number}
*/
function getJson_(key){
  assert.isString(key);
  if(this.read(J(key)) === "LONG JSON STRING") {
    var parsed = JSON.parse(this.getString(J(key)));
  } else {
    var parsed = JSON.parse(this.read(J(key)));
  }
  assert(parsed === null || typeof parsed === "number" || typeof parsed === "boolean");
  return parsed;
}//getJson_

if(typeof exports === "undefined") exports = {};
exports.getJson_ = getJson_;

