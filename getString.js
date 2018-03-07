/**
  @param {string} key
  @return {string}
*/
function getString_(key) {
  assert(typeof key === "string");
  var stringified = this.read("$" + key + "$");
  assert(typeof stringified === "string");
  var length = parseInt(stringified);
  if(length == 0) return "";

  var fragments = [];
  for(var i=0; i<length; ++i) {
    var fragment = this.read("$" + key + "$" + i);
    assert(typeof fragment === "string");
    fragments.push(fragment);
  }
  return fragments.join("");
}//getString_
