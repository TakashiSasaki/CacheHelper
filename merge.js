function merge_(o2){
  var o1 = this.transaction;
  var remove1 = o1["TO BE REMOVED"];
  var remove2 = o2["TO BE REMOVED"];
  if(remove1 === undefined) remove1 = [];
  if(remove2 === undefined) remove2 = [];
  Array.prototype.push.apply(remove1, remove2);
  for(var i in o2) {
    o1[i] = o2[i];
  }
  o1["TO BE REMOVED"] = remove1;
}


