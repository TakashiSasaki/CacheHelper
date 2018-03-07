/**
 * @param {string} key
 * @param {array} array
*/
function appendArray_(key, array) {
  assert(typeof key === "string");
  assert(array instanceof Array);
  var currentLength = parseInt(this.read("[" + key + "]"));
  assert(typeof currentLength === "number");
  this.write("[" + key + "]", "" + (currentLength + array.length));
  for(var i=0; i<array.length; ++i) {
    this.put("[" + key + "]"  + (currentLength + i), array[i]);
  }//for i
}//appendArray
