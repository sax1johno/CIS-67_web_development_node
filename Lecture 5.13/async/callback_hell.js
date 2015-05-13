var gimmeId = function(callback) {
    setTimeout(function() {
        callback(25);
    }, 0);
};

var gimmeFirstName = function(callback) {
    setTimeout(function() {
        callback("John");
    }, 0);
};

var gimmeLastName = function(callback) {
    setTimeout(function() {
        callback("O'Connor");
    }, 0);
};

var gimmeClass = function(callback) {
    setTimeout(function() {
        callback("Class is earned, not given");  
    }, 0);
};

setTimeout(function() {
      var me = {};
      gimmeId(function(id) {
          me.id = id;
          gimmeFirstName(function(firstName) {
              me.firstName = firstName;
              gimmeLastName(function(lastName) {
                  me.lastName = lastName;
                  console.log("me inside lastName", me);
              });
              console.log("Me inide firstName", me);
          });
          console.log("Me inside gimmeId", me);
      });
      console.log("me after gimmeId = ", me);
}, 0);

