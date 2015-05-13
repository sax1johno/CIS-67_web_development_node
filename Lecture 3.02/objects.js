var classroom = {
    "roomNumber": "IT-127",
    "studentCount": "10",
    "students": [
        { "name": "Nygel", "etc": "etc"},
    ],
    "attendance": []
};

var whatIWant = "attendance";

for (var asdfasdf in Object.keys(classroom)) {
    console.log(classroom[asdfasdf]);
}

classroom.whatIWant;
classroom.attendance = "";
classroom["attendance"];

console.log(classroom.processAge());
console.log(JSON.stringify(classroom));

// Does the opposite of JSON.stringify.
JSON.parse()
