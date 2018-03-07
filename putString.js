/**
  @param {string} key
  @param {string} string
  @return {object}
*/

function putString_(key, string) {
  assert(typeof key === "string");
  assert(typeof string === "string");
  this.remove(key);
  
  var fragments = [];
  assert(typeof this.nMaxValueLength === "number" && this.nMaxValueLength > 0);
  for(var i=0; i<string.length; i += this.nMaxValueLength) {
    fragments.push(string.substr(i, this.nMaxValueLength));
  }
  
  this.write("$" + key + "$", "" + fragments.length);
  for(var i=0; i<fragments.length; ++i) {
    this.write("$" + key + "$" + i, fragments[i]);
  }//for
}//putString_
