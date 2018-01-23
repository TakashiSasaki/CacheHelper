function putObject(key, object) {
  if(!(object instanceof Object)) throw "putObject: expects an object as a value";
  var properties = [];
  for(var i in object) {
    properties.push(i);
  }
  cache.put("{" + key + "}", JSON.stringify(properties));
  for(var i in object) {
    put("{" + key + "}" + i, object[i]);
  }
}

/**
  @param {string} key
  @param {value} value optional
*/
function getObject(key, keysJsonString) {
  if(keysJsonString === undefined) {
    var keysJsonString = cache.get("{" + key + "}");
    if(keysJsonString === null) throw "getObject: key {" + key + "} not found.";
  }
  var properties = JSON.parse(keysJsonString);
  if(!(properties instanceof Array)) throw "getObject: no array in {" + key + "}.";
  var candidates = [];
  for(var i=0; i<properties.length; ++i) {
    candidates.push("${" + key + "}" + properties[i] + "$");
    candidates.push("({" + key + "}" + properties[i] + ")");
    candidates.push("{{" + key + "}" + properties[i] + "}");
    candidates.push("[{" + key + "}" + properties[i] + "]");
  }
  var values = cache.getAll(candidates);
  var result = {};
  for(var i=0; i<properties.length; ++i) {
    if(typeof values["${" + key + "}" + properties[i] + "$"] === "string") {
      result[properties[i]] = getString("{" + key + "}" + properties[i]);
      continue;
    }
    if(typeof values["({" + key + "}" + properties[i] + ")"] === "string") {
      result[properties[i]] = getJson("{" + key + "}" + properties[i]);
      continue;
    }
    if(typeof values["{{" + key + "}" + properties[i] + "}"] === "string") {
      result[properties[i]] = getObject("{" + key + "}" + properties[i]);
      continue;
    }
    if(typeof values["[{" + key + "}" + properties[i] + "]"] === "string") {
      result[properties[i]] = getArray("{" + key + "}" + properties[i]);
      continue;
    }
  }
  return result;
}
