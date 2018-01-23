function isJavaObject_(x){
  if(Object.prototype.toString.call(x) === "[object JavaObject]") return true;
  return false;
}
