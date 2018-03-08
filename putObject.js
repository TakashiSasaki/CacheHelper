/**
  @param {string} key
  @param {object} object
  @return {void}
*/
function putObject_(key, object) {
  assert(typeof key === "string");
  assert(typeof object === "object");
  
  this.remove(key);
  this.write(O(key), JSON.stringify(Object.keys(object)));
  for(var i in object) {
    assert(typeof i === "string");
    this.put(O(key,i), object[i]);
  }  
}//putObject_

if(typeof exports === "undefined") exports = {};
exports.putObject_ = putObject_;

