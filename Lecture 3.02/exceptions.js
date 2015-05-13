var testObject = {};

try {
    console.log(testObject.keys());
} catch (e) {
    console.log("An exception was caught: ", e.message);
} finally {
    console.log("still do something important");
}

console.log("I should show up");