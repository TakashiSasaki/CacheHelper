/**
  @param {string} key
  @param {string} string
  @return {object}
*/

function putString_(key, string) {
  assert(typeof key === "string");
  assert(typeof string === "string");
  putString_.count  += 1;
  var all = {"TO BE REMOVED": modKey(key)};
  
  var fragments = [];
  assert(typeof this.nMaxValueLength === "number" && this.nMaxValueLength > 0);
  for(var i=0; i<string.length; i += this.nMaxValueLength) {
    fragments.push(string.substr(i, this.nMaxValueLength));
  }
  
  all["$" + key + "$"] = "" + fragments.length;
  for(var i=0; i<fragments.length; ++i) {
    all["$" + key + "$" + i] = fragments[i];
  }
  this.merge(all);
}//putString_
