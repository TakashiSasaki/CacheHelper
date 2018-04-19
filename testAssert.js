console.log("testAssert");
if(typeof assert === "undefined") require("myassert-browserified");
console.log(assert);
assert.isString("abc");
assert.lengthOf([1,2,3], 3);
