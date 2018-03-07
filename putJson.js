/**
  @param {string} key
  @param {Any} any
  @return {object}
*/
function putJson_(key, any) {
  assert.strictEqual(typeof key, "string");
  assert(any !== undefined);
  putJson_.count += 1;
  var stringified = JSON.stringify(any);
  var all = {"TO BE REMOVED": getDerivedKeys_(key)};
  if(stringified.length > this.nMaxValueLength){
    this.transaction["(" + key + ")"] = "LONG JSON STRING";
    merge_(putString("(" + key + ")", stringified));
  } else {
    this.transaction["(" + key + ")"] = stringified;
  }
}//putJson
