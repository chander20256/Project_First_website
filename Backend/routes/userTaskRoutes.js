const express = require("express");
const router = express.Router();
const {
  completeTask,
  getUserCompletedTasks,
} = require("../controllers/userTaskController");

router.post("/complete", completeTask);
router.get("/:userId", getUserCompletedTasks);

module.exports = router;