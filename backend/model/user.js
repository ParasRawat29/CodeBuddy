const mongoose = require("mongoose");
const schema = mongoose.Schema;
// parasRawat
// lolipop

const userSchema = new schema({
  name: {
    type: String,
    required: [true, "name cannot be empty"],
    min: [3, "name field must be minimum 3 alphabet long"],
  },
  email: {
    type: String,
    required: [true, "email cannot be empty"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password cannot be empty"],
    select: false,
  },
});
module.exports = mongoose.model("User", userSchema);
