var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const habitSchema = new Schema({
  habitName: String,
  numberOfDays: Number,
  complete: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('Habit', habitSchema);