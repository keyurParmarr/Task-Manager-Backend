const express = require("express");
// const Task = require("./taskModel");
const router = express.Router();
const taskcontrol = require("./taskControl");
router.get("/", taskcontrol.getcontrol);
router.post("/", taskcontrol.postcontrol);
router.get("/:email", taskcontrol.getsingletask);
router.post("/:email", taskcontrol.deletetask);
router.put("/:email", taskcontrol.updatetask);

// router.route("/").get(taskcontrol.getcontrol).post(taskcontrol.postcontrol);
// router
//   .route("/:id")
//   .get(taskcontrol.getsingletask)
//   .delete(taskcontrol.deletetask)
//   .put(taskcontrol.updatetask);

module.exports = router;
