function L(key, i){
  assert.isString(key);
  assert(i === undefined || typeof i === "number");
  if(i === undefined) return "[" + key + "]";
  return "[" + key + "]" + i;
}

if(typeof exports === "undefined") exports = {};
exports.L = L;

