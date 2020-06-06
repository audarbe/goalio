var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const categorySchema = new Schema({
  category: {
    type: String,
    enum: [
      'Educational',
      'Health',
      'Relationship',
      'Personal',
      'Career',
      'Financial',
      'Spiritual',
      'Psychological',
      'External',
      'Experiential',
    ],
  },
});

module.exports = mongoose.model('Category', categorySchema);