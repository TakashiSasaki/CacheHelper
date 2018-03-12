function appendObject_(key, object){
  assert.strictEqual(arguments.length, 2);
  assert.strictEqual(typeof key, "string");
  assert(!(object instanceof Array));
  assert.strictEqual(typeof object, "object");
  
  for(var i in object){
    this.appendValue(key, i, object[i]);
  }//for i
  
  this.write(O(key), JSON.stringify(properties));
}//appendObject_
