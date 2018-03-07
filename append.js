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
//  var all = {};
//  all["[" + key + "]"] = "" + (parseInt(l) + array.length);
  for(var i=0; i<array.length; ++i) {
    this.put("[" + key + "]"  + (currentLength + i), array[i]);
    //merge_(all, putAny("[" + key + "]" + (parseInt(l) + i), array[i]));
  }//for i
//  if(typeof all["TO BE REMOVED"] !== "undefined") {
//    cache.removeAll(all["TO BE REMOVED"]);
//    delete all["TO BE REMOVED"];
//  }
//  cache.putAll(all);
}//appendArray
