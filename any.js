if(console === undefined) console = Logger;

  /**
    @param {Any} any object, string, number, boolean or null
    @param {string} key
    @return {void}
  */
function putAny_(key, any){  
  assert.equal(typeof key, "string");
  putAny_.count += 1;
  if(typeof any === "string") {
    this.putString(key, any);
    return;
  }
  if(any === null || typeof any === "boolean" || typeof any === "number") {
    this.putJson(key,any);
    return;
  }
  if(any instanceof Array) {
    this.putArray(key, any);
    return;
  }
  if(any instanceof Object) {
    this.putObject(key, any);
    return;
  }
  throw "KeyValueStore#putAny: unexpected type of value. " + typeof any;
}

/**
  @param {string} key
  @param {object} values
  @returns {Any}
*/
function getAny_(key){
  assert.equal(typeof key, "string");
  getAny_.count += 1;
  this.prefetch([key]);
  if(this.prefetched["$" + key + "$"]) {
    return this.getString(key);
  }
  if(this.prefetched["(" + key + ")"]) {
    return this.getJson(key);
  }
  if(this.prefetched["[" + key + "]"]) {
    return this.getArray(key);
  }
  if(this.prefetched["{" + key + "}"]) {
    return this.getObject(key);
  }
  throw "getAny: key " + key + " not found.";
}
