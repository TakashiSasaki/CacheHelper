function H(key) {  // generate hint-key
  assert(typeof key === "string");
  return "#" + key + "#";
}

if(typeof exports === "undefined") exports = {};
exports.H = H;


