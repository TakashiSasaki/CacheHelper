/**
  @param {string} key
  @param {object} values
  @return {string}
*/
function getString_(key) {
  assert(typeof key === "string");
  getString_.count += 1;
  this.prefetch([key]);
  if(typeof this.prefetched["$" + key + "$"] === "undefined") throw "getString: key $" + key + "$ not found.";
  var length = parseInt(this.prefetched["$" + key + "$"]);
  if(length == 0) return "";

  var keys = [];
  for(var i=0; i<length; ++i) {
    keys.push("$" + key + "$" + i);
  }
  this.prefetch(keys);
  var fragments = [];
  for(var i=0; i<length; ++i) {
    var fragment = this.prefetched["$" + key + "$" + i];
    assert(typeof fragment === "string");
    if(fragment === null) throw "getString: missing a part of string value.";
    fragments.push(fragment);
  }
  return fragments.join("");
}//getString_
