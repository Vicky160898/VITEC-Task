const express = require("express");
const isAuth = require("../middleware/isAuth");
const { LoanRegister, PayableAmount } = require("../controller/loanController");
const router = express.Router();

router.post("/loan/apply", isAuth, LoanRegister);
router.get("/loan", isAuth, PayableAmount);

module.exports = router;
