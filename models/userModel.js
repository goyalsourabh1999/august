const mongoose = require("mongoose");
const validator = require("validator");
// Database link
const config = require("../configs/config");
// database connection
mongoose
  .connect(config.DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(conn => {
    console.log("User  DB connected");
    // console.log(conn);
  });

// structure => Plan
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    minlength: 8,
    required:true
  },
  confirmPassword: {
    type: String,
    minlength: 8,
    validate: function() {
      return this.password == this.confirmPassword;
    }
  },
  email: {
    type: String,
    unique: true,
    validate: validator.isEmail
  },
  role: {
    type: String,
    enum: ["admin", "restaurant Owner", "user"],
    default: "user"
  },
  phone: {
    type: Number
  }
});
userSchema.pre("save", function() {
  // encrypt => password

  // confirm => remove from db
  this.confirmPassword = undefined;
});
// model
const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;
