const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please add a email"],
  },
  password: {
    type: String,
    required: true,
  },
  tasks: {
    type: [
      {
        name: String,
        completed: Boolean,
      },
    ],
  },
});
const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
