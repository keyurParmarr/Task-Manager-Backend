const Task = require("./taskModel");
const lodash = require("lodash");
//Get all tasks
const getcontrol = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//Add a task
const postcontrol = async (req, res) => {
  try {
    const { email, tasks } = req.body;
    const data = await Task.findOneAndUpdate(
      { email },
      { tasks },
      { new: true }
    );
    const userData = lodash.omit(data.toJSON(), "password", "__v");
    res.status(200).json(userData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

//Find single task
const getsingletask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json(`NO data found from the id number ${id}`);
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//Delete a task
const deletetask = async (req, res) => {
  try {
    const { newtasks } = req.body;
    const { email } = req.params;
    const task = await Task.findOneAndUpdate(
      { email },
      { tasks: newtasks },
      { new: true }
    );
    const userData = lodash.omit(task.toJSON(), "password", "__v");
    if (!task) {
      return res.status(404).json(`NO data found for deletion`);
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//Put method
const updatetask = async (req, res) => {
  try {
    const email = req.params.email;
    if (req.body.name) {
      await Task.findOneAndUpdate(
        {
          email: email,
          "tasks._id": req.body.id,
        },
        {
          $set: { "tasks.$.name": req.body.name, "tasks.$.completed": false },
        }
      );
    } else {
      await Task.findOneAndUpdate(
        {
          email: email,
          "tasks._id": req.body.id,
        },
        {
          $set: { "tasks.$.completed": true },
        }
      );
    }
    const up1Data = await Task.findOne({ email }, { tasks: 1, _id: 0 });
    res.json(up1Data.toJSON());
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
module.exports = {
  postcontrol,
  getcontrol,
  getsingletask,
  deletetask,
  updatetask,
};
