/**
  @param {string} key
  @return {null|boolean|number}
*/
function getJson_(key){
  assert(typeof key === "string");
  if(this.read("(" + key + ")") === "LONG JSON STRING") {
    var x = JSON.parse(this.getString("(" + key + ")"));
  } else {
    var x = JSON.parse(this.read("(" + key + ")"));
  }
  assert(x === null || typeof x === "number" || typeof x === "boolean");
  return x;
}//getJson_
