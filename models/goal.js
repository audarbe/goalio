var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const categorySchema = new Schema({
  category: {
    type: Array,
    // enum: [
    //   'Educational',
    //   'Health',
    //   'Relationship',
    //   'Personal',
    //   'Career',
    //   'Financial',
    //   'Spiritual',
    //   'Psychological',
    //   'External',
    //   'Experiential',
    // ],
  },
});

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
      default: 0
    },
    userId: String,
    categories: [categorySchema],
    milestones: [{ type: Schema.Types.ObjectId, ref: 'Milestone' }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Goal', goalSchema);
