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
  assert(typeof this.maxValueLength === "number" && this.maxValueLength > 0);
  for(var i=0; i<string.length; i += this.maxValueLength) {
    fragments.push(string.substr(i, this.maxValueLength));
  }
  
  this.write(S(key), ""+fragments.length);
  for(var i=0; i<fragments.length; ++i) {
    this.write(S(key,i), fragments[i]);
  }//for
}//putString_
