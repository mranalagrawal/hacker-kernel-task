const mongoose = require('mongoose');


const taskModel = new mongoose.Schema({
    name: String,
    type: String,
    user:String
   
})

var task = mongoose.model('task', taskModel);

module.exports = task;