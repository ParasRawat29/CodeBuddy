const mongoose = require("mongoose");
const schema = mongoose.Schema;

const CodeSchema = new schema({
  code: {
    type: String,
    required: [true, "Code field cannot be empty"],
  },
  fileName: {
    type: String,
    required: [true, "fileName cannot be empty"],
  },
  language: {
    type: String,
    required: [true, "language cannot be empty"],
  },
  user: {
    type: schema.Types.ObjectId,
    ref: "User",
    required: [true, "user id is required while creating code"],
  },
  createdOn: {
    type: Date,
  },
  updatedOn: {
    type: Date,
  },
});

module.exports = mongoose.model("Code", CodeSchema);
