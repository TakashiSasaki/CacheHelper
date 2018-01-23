function putObject(key, object) {
  if(!(object instanceof Object)) throw "putObject: expects an object as a value";
  var keys = [];
  for(var i in object) {
    keys.push(i);
  }
  cache.put("{" + key + "}", JSON.stringify(keys));
  for(var i in object) {
    put("{" + key + "}" + i, object[i]);
  }
}

function getObject(key) {
  var keysJsonString = cache.get("{" + key + "}");
  if(keysJsonString === null) throw "getObject: key {" + key + "} not found.";
  var keys = JSON.parse(keysJsonString);
  if(!(keys instanceof Array)) throw "getObject: no array in {" + key + "}.";
  var o = {};
  for(var i=0; i<keys.length; ++i) {
    o[keys[i]] = get("{" + key + "}" + keys[i]);
  }
  return o;
}

