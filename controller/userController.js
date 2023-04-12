const User = require("../model/userModel");
const generateToken = require("../config/generateToken");

const UserRegister = async (req, res) => {
  const { fullName, email, phone, address } = req.body;

  //here we register the user....

  try {
    const finduser = await User.findOne({ email });
    if (!finduser) {
      const user = await User.create({
        fullName,
        email,
        phone,
        address,
      });
      return res.status(201).json(user);
    }
    return res.status(401).send("User Already Present");
  } catch (error) {
    return res.status(401).send("Something wents wrong");
  }
};

//here we performing the authentication process taking password and email from user..

const UserLogin = async (req, res) => {
  const { email, phone } = req.body;
  const finduser = await User.findOne({ email, phone });
  try {
    if (finduser) {
      return res.status(201).json({
        _id: finduser._id,
        email: finduser.email,
        fullName: finduser.fullName,
        phone: finduser.phone,
        address: finduser.address,
        token: generateToken(finduser),
      });
    } else {
      return res.status(401).send("Invalid Credential");
    }
  } catch (error) {
    return res.status(401).send("Something wents wrong");
  }
};

module.exports = { UserRegister, UserLogin };
