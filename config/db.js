const mongoose = require("mongoose");

const connect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
    return conn;
  } catch (error) {
    console.log("MongoDB Disconnected");
    process.exit();
  }
};

module.exports = connect;
