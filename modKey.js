//function getDerivedKeys_(key){
function modKey(key) {
  assert(typeof key === "string");
  return ["$" + key + "$", "(" + key + ")", "[" + key + "]", "{" + key + "}", "#" + key + "#"];  
}
