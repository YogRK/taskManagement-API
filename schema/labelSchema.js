const mongoose = require('mongoose');

const labelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '#000000',  // Default color is black
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

labelSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Label = mongoose.model('Label', labelSchema);

module.exports = Label;
