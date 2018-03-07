/**
  @param {string} key
*/
function getObject_(key) {
  assert(typeof key === "string");
  //this.prefetch([key]);
  //assert(this.prefetched["{" + key + "}"] !== undefined);
  var stringified = this.read("{" + key + "}", true);
  var properties = JSON.parse(stringified);
  assert(properties instanceof Array);
  //var keys = [];
  //for(var i=0; i<properties.length; ++i) {
  //  keys.push("{" + key + "}" + properties[i]);
  //}
  
  //this.prefetch(keys);
  var object = {};
  for(var i=0; i<properties.length; ++i) {
    assert(typeof properties[i] === "string");
    object[properties[i]] = this.get("{" + key + "}" + properties[i]);
  }
/*    
    if(typeof this.prefetched["${" + key + "}" + properties[i] + "$"] === "string") {
      result[properties[i]] = this.getString("{" + key + "}" + properties[i]);
      continue;
    }
    if(typeof this.prefetched["({" + key + "}" + properties[i] + ")"] === "string") {
      result[properties[i]] = this.getJson("{" + key + "}" + properties[i]);
      continue;
    }
    if(typeof this.prefetched["{{" + key + "}" + properties[i] + "}"] === "string") {
      result[properties[i]] = this.getObject("{" + key + "}" + properties[i]);
      continue;
    }
    if(typeof this.prefetched["[{" + key + "}" + properties[i] + "]"] === "string") {
      result[properties[i]] = this.getArray("{" + key + "}" + properties[i]);
      continue;
    }
    throw "getObject: any type of value is not found for {" + key  + "}" + properties[i];
  }
*/
  return object;
}//getObject_

