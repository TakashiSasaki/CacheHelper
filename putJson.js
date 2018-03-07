/**
  @param {string} key
  @param {Any} any
  @return {void}
*/
function putJson_(key, any) {
  assert(typeof key === "string");
  assert(any !== undefined);
  this.remove(key);
  var stringified = JSON.stringify(any);
  if(stringified.length > this.maxValueLength){
    this.write("(" + key + ")", "LONG JSON STRING");
    this.putString("(" + key + ")", stringified);
  } else {
    this.write("(" + key + ")", stringified);
  }
}//putJson_
