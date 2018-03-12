function J(key){
  assert.isString(key);
  return "(" + key + ")";
}

if(typeof exports === "undefined") exports = {};
exports.J = J;



