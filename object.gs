/**
  @param {string} key
  @param {object} object
  @return {object}
*/
function putObject(key, object) {
  if(typeof key !== "string") throw "putObject: expects string key.";
  if(!(object instanceof Object)) throw "putObject: expects an object as a value";
  var properties = [];
  for(var i in object) {
    properties.push(i);
  }
  var all = {"TO BE REMOVED": getDerivedKeys(key)};
  all["{" + key + "}"] = JSON.stringify(properties);
  for(var i in object) {
    merge(all, putAny("{" + key + "}" + i, object[i]));
  }  
  return all;
}//putObject

/**
  @param {string} key
  @param {value} value optional
*/
function getObject(key, values) {
  if(typeof key !== "string") throw "getObject: expects string key.";
  if(values === undefined) {values = {};}
  if(values["{" + key + "}"] === undefined) {
    values["{" + key + "}"] =  cache.get("{" + key + "}");
    if(values["{" + key + "}"] === null) throw "getObject: key {" + key + "} not found.";
  }
  var properties = JSON.parse(values["{" + key + "}"]);
  if(!(properties instanceof Array)) throw "getObject: no array in {" + key + "}.";
  var keys = [];
  for(var i=0; i<properties.length; ++i) {
    keys.push("${" + key + "}" + properties[i] + "$");
    keys.push("({" + key + "}" + properties[i] + ")");
    keys.push("{{" + key + "}" + properties[i] + "}");
    keys.push("[{" + key + "}" + properties[i] + "]");
  }
  merge(values, cache.getAll(keys));
  var result = {};
  for(var i=0; i<properties.length; ++i) {
    if(typeof values["${" + key + "}" + properties[i] + "$"] === "string") {
      result[properties[i]] = getString("{" + key + "}" + properties[i], values);
      continue;
    }
    if(typeof values["({" + key + "}" + properties[i] + ")"] === "string") {
      result[properties[i]] = getJson("{" + key + "}" + properties[i], values);
      continue;
    }
    if(typeof values["{{" + key + "}" + properties[i] + "}"] === "string") {
      result[properties[i]] = getObject("{" + key + "}" + properties[i], values);
      continue;
    }
    if(typeof values["[{" + key + "}" + properties[i] + "]"] === "string") {
      result[properties[i]] = getArray("{" + key + "}" + properties[i], values);
      continue;
    }
  }
  return result;
}//getObject

function testObject(){
  var o = {
    a: 1,
    b: null,
    c: "hello"
  };
  removeAndPut(putObject("k", o));
  var got = getObject("k");
  if(JSON.stringify(o) !== JSON.stringify(got)) throw "testObject: o != got.";
}
