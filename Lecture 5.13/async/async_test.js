var testFunction = function(callback) {
    console.time("Test_function_run");
    var counter = 0;
    for (var i = 0; i < 1000; i++) {
        counter++;
    }
    console.timeEnd("Test_function_run")
    callback(null, counter);
};

var generatedCounter;

function(req, res) {
// setTimeout(function() {
    testFunction(function(err, counter) {
        if (!err) {
            generatedCounter = counter;
            console.log(counter);
        } 
    });
    //  generatedCounter = testFunction();
}, 0);

