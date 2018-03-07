function put_(key, any) {
  assert.strictEqual(typeof key, "string");
  assert(any !== undefined);
  put_.count += 1;
  this.putAny(key, any);
  var keys = Object.keys(this.transaction);
  this.transaction["#" + key + "#"] = JSON.stringify(keys);
  if(typeof this.transaction["TO BE REMOVED"] !== "undefined") {
    this.storage.removeAll(this.transaction["TO BE REMOVED"]);
    delete this.transaction["TO BE REMOVED"];
  }
  this.storage.putAll(this.transaction);
}
