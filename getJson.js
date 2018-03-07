/**
  @param {string} key
  @param {string} value optional
  @return {Array}
*/
function getJson_(key){
  assert.strictEqual(typeof key, "string");
  getJson_.count += 1;
  this.prefetch([key]);
  if(this.prefetched["(" + key + ")"] === "LONG JSON STRING") {
    var stringified = this.getString("(" + key + ")");
    return JSON.parse(stringified);
  } else {
    return JSON.parse(this.prefetched["(" + key + ")"]);
  }
}//getJson_

