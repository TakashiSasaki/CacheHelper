function S(key, i) {  // generate string-key
  assert(typeof key === "string");
  assert(i === undefined || typeof i === "number");
  if(i === undefined) return "$" + key + "$";
  return "$" + key + "$" + i;
}

if(typeof exports === "undefined") exports = {};
exports.S = S;


