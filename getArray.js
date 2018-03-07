/**
 * @param {stirng} key
 * @return {object}
 */
function getArray_(key){
  assert(typeof key === "string");
  const stringified = this.read("[" + key + "]");
  assert(typeof stringified === "string");
  var length = parseInt(stringified);
  assert(typeof length === "number");
  var array = [];
  for(var i=0; i < length; ++i) {
    array.push(this.get("[" + key + "]" + i));
  }
  return array;
}//getArray
