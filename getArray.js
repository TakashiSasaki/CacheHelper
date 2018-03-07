/**
 * @param {stirng} key
 * @param {object} values, optional
 * @return {object}
 */
function getArray_(key){
  assert(typeof key === "string");
  //this.prefetch([key]);
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
