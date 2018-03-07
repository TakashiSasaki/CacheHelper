//if(typeof global === "undefined") global = this;
//if(global.cache === undefined) global.cache = CacheService.getScriptCache();

function getDerivedKeys_(key){
  return ["$" + key + "$", "(" + key + ")", "[" + key + "]", "{" + key + "}", "#" + key + "#"];
}

function test1_(){
  Logger.log("test1_: begin");
  var o = {
    a : 1,
    b: null,
    c: false,
    d: [ "hello", 1.23, null]
  }
  var all = put("test1_", o);
  Logger.log(all);
  if(JSON.stringify(o) !== JSON.stringify(get("test1_"))) throw "test1_: o != get(\"test1_\").";
  Logger.log("test1_: end");
}


if(exports === undefined) exports = {};
