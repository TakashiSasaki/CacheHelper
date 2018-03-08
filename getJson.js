/**
  @param {string} key
  @return {null|boolean|number}
*/
function getJson_(key){
  assert(typeof key === "string");
  if(this.read(J(key)) === "LONG JSON STRING") {
    var x = JSON.parse(this.getString(J(key)));
  } else {
    var x = JSON.parse(this.read(J(key)));
  }
  assert(x === null || typeof x === "number" || typeof x === "boolean");
  return x;
}//getJson_
