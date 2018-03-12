function J(key){
  assert(typeof key === "string");
  return "(" + key + ")";
}

if(typeof exports === "undefined") exports = {};
exports.J = J;



