const mongoose = require('mongoose');

var studentschema = mongoose.Schema({
    studentid:Number,
    name:String,
    surname:String,
    department:String,
    age:Number
});

var studentmodel = mongoose.model('student',studentschema)

module.exports = studentmodel;

