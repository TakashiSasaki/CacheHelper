//function prefetch_(keys) {
//  assert(keys instanceof Array);
//  var bNeedToGet = false;
//  for(var i in keys) {
//    assert(typeof keys[i] === "string");
//    if(typeof this.prefetched["$" + keys[i] + "$"] === "undefined" &&
//       typeof this.prefetched["(" + keys[i] + ")"] === "undefined" &&
//       typeof this.prefetched["{" + keys[i] + "}"] === "undefined" &&
//       typeof this.prefetched["[" + keys[i] + "]"] === "undefined") {
//          bNeedToGet = true;
//          break;
//        }
//  }//for i
//  if(bNeedToGet === false) return;
//  var keysToGet = [];
//  for(var j in keys) {
//    assert(typeof keys[j] === "string");
//    keysToGet.push(keys[j]);
//    keysToGet.push("$" + keys[j] + "$");
//    keysToGet.push("$" + keys[j] + "$0");
//    keysToGet.push("[" + keys[j] + "]");
//    keysToGet.push("[" + keys[j] + "]0");
//    keysToGet.push("{" + keys[j] + "}");
//    keysToGet.push("(" + keys[j] + ")");
//  }//for j
//  Logger.log("prefetchAny_: keysToGet = " + keysToGet);
//  
//  var all = this.storage.getAll(keysToGet);
//  for(var k in all){
//    if(all[k] === null || all[k] === undefined) continue;
//    this.prefetched[k] = all[k];
//  }//for k
//}//prefetch_
