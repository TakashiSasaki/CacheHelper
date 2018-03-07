function testKeyValueStore(){
  var keyValueStore = new KeyValueStore();
  keyValueStore.nMaxValueLength = 10;
  
  keyValueStore.put("k", null); 
  assert.strictEqual(keyValueStore.getAny("k"), null);

  keyValueStore.put("emptyString", "");
  assert.strictEqual(keyValueStore.getAny("emptyString"), "");
  
  keyValueStore.put("booleanTrue", true);
  assert.strictEqual(keyValueStore.getAny("booleanTrue"), true);
  
  keyValueStore.put("booleanFalse", false);
  assert.strictEqual(keyValueStore.getAny("booleanFalse"), false);
  
  keyValueStore.put("number", 1.234E6);
  assert.strictEqual(keyValueStore.getAny("number"), 1.234E6);

  var longString =  "aosifjdajasiopfjdsajioasfopsiadfsajasd:alnvuipaojvdaslfhuiaojask;fcmuioa:kscdasnpiuacjaso";
  keyValueStore.put("longString", longString);
  var longString_get = keyValueStore.get("longString");
  assert.strictEqual(longString_get, longString);
  
  var emptyString = "";
  keyValueStore.put("emptyString", emptyString);
  assert.strictEqual(keyValueStore.get("emptyString"), emptyString);
 
}
