const { Schema, model } = require("mongoose");

const LoanSchema = new Schema({
  amount: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  interestRate: { type: Number, default: 0.08 },
  dailyInterest: { type: Number, default: 0.01 },
  extraPenalty: { type: Number, default: 0.04 }, //4% consider extra penaly here...
  paidAmount: { type: Number, default: 0 },
});

const Loan = model("Loan", LoanSchema);

module.exports = Loan;
