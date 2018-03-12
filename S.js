function S(key, i) {  
  assert.isString(key);
  assert(i === undefined || typeof i === "number");
  if(i === undefined) return "$" + key + "$";
  return "$" + key + "$" + i;
}

if(typeof exports === "undefined") exports = {};
exports.S = S;


