require("dotenv").config();
const express = require("express");
const connect = require("./config/db");
const UserSchema = require("./routes/userRoutes");
const LoanRouter = require("./routes/loanRoutes");
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());

//here we getting the all the routes...
app.use("/api", UserSchema);
app.use("/api", LoanRouter);

connect();
app.listen(PORT, () => {
  console.log("server started successfully");
});
