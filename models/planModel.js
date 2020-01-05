const mongoose = require("mongoose");
// Database link
const config = require("../configs/config");
// database connection
mongoose
  .connect(config.DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(conn => {
    console.log("Plan DB connected");
    // console.log(conn);
  });

// structure => Plan
const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter Name of the plan"]
  },
  rating: {
    type: Number,
    default: 5
  },
  averageRating: {
    type: Number,
    default: 5
  },
  description: {
    type: String,
    default: "Good Plan"
  }
});
// model
const planModel = mongoose.model("planModel", planSchema);
module.exports = planModel;
