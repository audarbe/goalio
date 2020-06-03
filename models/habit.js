var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const daySchema = new Schema({
  day: Number,
  habitId: String,
  complete: {
    type: Boolean,
    default: false
  }
})

const habitSchema = new Schema({
  milestoneId: String,
  habitName: String,
  totalDays: Number,
  dailyProgress: [daySchema]
})

module.exports = mongoose.model('Habit', habitSchema);