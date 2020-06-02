var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const milestoneSchema = new Schema(
    {
      milestoneName: String,
      numberOfDays: Number,
      progress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
      },
      habits: [{ type: Schema.Types.ObjectId, ref: 'Habit' }],
  });

module.exports = mongoose.model('Milestone', milestoneSchema);