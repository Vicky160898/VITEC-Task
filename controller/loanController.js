const Loan = require("../model/loanModel");

//here we are applying for the loan...

const LoanRegister = async (req, res) => {
  const { amount, startDate, endDate } = req.body;

  try {
    const finduser = await Loan.findOne({ amount });
    if (!finduser) {
      const user = await Loan.create({
        amount,
        startDate,
        endDate,
        user: req.id,
      });
      return res.status(201).json(user);
    }
    return res.status(401).send("You Already Taking the loan");
  } catch (error) {
    return res.status(401).send("Something wents wrong");
  }
};

//here we calculate the payable amount for a given loan after the loan expiry date:

const PayableAmount = async (req, res) => {
  const loan = await Loan.findById(req.params.id).populate("user");

  try {
    if (!loan) {
      return res.status(404).send("Loan not found");
    }
    const delayDay = Math.ceil(
      (Date.now() - loan.endDate) / (1000 * 60 * 60 * 24)
    );
    if (delayDay <= 0) {
      return res.status(400).send("Loan is not yet due");
    }
    const totalInterest = loan.amount * (loan.interestRate / 365) * delayDay;
    const dailyInterest = loan.amount * loan.dailyInterest;
    const totalPenalty =
      Math.floor(delayDay / 15) * loan.amount * loan.extraPenalty;

    const TotalAmount =
      loan.amount +
      totalInterest +
      dailyInterest +
      totalPenalty -
      loan.paidAmount;

    // Update the loan paid amount
    // await Loan.findByIdAndUpdate(
    //   req.params.id,
    //   { paidAmount: TotalAmount },
    //   { new: true }
    // );

    return res.status(200).send({
      user: loan.user,
      loanAmount: loan.amount,
      totalInterest,
      dailyInterest,
      totalPenalty,
      paidAmount: TotalAmount,
    });
  } catch (error) {
    return res.status(401).send("Something wents wrong");
  }
};

module.exports = { LoanRegister, PayableAmount };
