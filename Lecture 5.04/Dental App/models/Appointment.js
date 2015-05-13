var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.ObjectId;

var AppointmentSchema = new Schema({
    date: Date,
    user: { type: ObjectId, ref: 'User'},
    notes: String
});

module.exports = mongoose.model('Appointment', AppointmentSchema);