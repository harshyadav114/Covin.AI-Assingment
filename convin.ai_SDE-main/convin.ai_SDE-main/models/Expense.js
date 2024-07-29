const mongoose = require('mongoose');

const expenseSplitSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  percentage: { type: Number },
});

const expenseSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  splitMethod: { type: String, enum: ['equal', 'exact', 'percentage'], required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  splits: [expenseSplitSchema],
});

module.exports = mongoose.model('Expense', expenseSchema);