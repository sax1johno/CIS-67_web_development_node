var stringArray = [];

var newStringArray = stringArray.concat([ "a", "b", "c", "d", "e", "f", "g"]);

newStringArray.push("h");

console.log(newStringArray);

var popped = newStringArray.pop();

console.log("popped: ", popped);
console.log(newStringArray);

var shifted = newStringArray.shift();

console.log("shifted: ", shifted);
console.log(newStringArray);

newStringArray.unshift("Heeyooooo");
console.log(newStringArray);
