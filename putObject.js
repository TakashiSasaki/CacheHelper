/**
  @param {string} key
  @param {object} object
  @return {object}
*/
function putObject_(key, object) {
  putObject_.count += 1;
  assert(typeof key, "string");
  assert(typeof object, "object");
  var properties = [];
  for(var i in object) {
    properties.push(i);
  }
  this.merge({"TO BE REMOVED": getDerivedKeys_(key)});
  this.transaction["{" + key + "}"] = JSON.stringify(properties);
  for(var i in object) {
    this.merge_(this.putAny("{" + key + "}" + i, object[i]));
  }  
}//putObject_
