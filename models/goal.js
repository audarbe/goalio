var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const goalSchema = new Schema(
  {
    goalName: String,
    priority: {
      type: Number,
      min: 1,
      max: 3,
    },
    difficulty: {
      type: Number,
      min: 1,
      max: 5,
    },
    daysToComplete: {
      type: Number,
      min: 1,
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    userId: String,
    categories: [{ type: Schema.Types.Mixed, ref: 'Category' }],
    milestones: [{ type: Schema.Types.ObjectId, ref: 'Milestone' }]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Goal', goalSchema);
