var list = [];

exports.addItem = function(item) {
    list.push(item);
};

exports.displayList = function() {
    return JSON.stringify(list);
};