function O(key, i){
  assert.isString(key);
  assert(i === undefined || typeof i === "string");
  if(i === undefined) return "{" + key + "}";
  return "{" + key + "}" + i;
}

if(typeof exports === "undefined") exports = {};
exports.O = O;

