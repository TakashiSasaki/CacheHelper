/**
  @param {string} key
  @param {value} value optional
*/
function getObject_(key) {
  assert(typeof key === "string");
  getObject_.count += 1;
  this.prefetch([key]);
  assert(this.prefetched["{" + key + "}"] !== undefined);
  var properties = JSON.parse(this.prefetched["{" + key + "}"]);
  assert(properties instanceof Array);
  var keys = [];
  for(var i=0; i<properties.length; ++i) {
    keys.push("{" + key + "}" + properties[i]);
  }
  this.prefetch(keys);
  var result = {};
  for(var i=0; i<properties.length; ++i) {
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
  return result;
}//getObject_

