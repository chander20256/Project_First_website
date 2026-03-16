const User = require("../models/User");
const Task = require("../models/Task");
const UserTask = require("../models/UserTask");

const completeTask = async (req, res) => {
  try {
    const { userId, taskId } = req.body;

    const user = await User.findById(userId);
    const task = await Task.findById(taskId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const existingTask = await UserTask.findOne({ userId, taskId });

    if (existingTask) {
      return res.status(400).json({ message: "Task already completed" });
    }

    const completedTask = await UserTask.create({
      userId,
      taskId,
      status: "completed",
      earnedPoints: task.reward,
    });

    user.credits += task.reward;
    await user.save();

    res.status(200).json({
      message: "Task completed successfully",
      completedTask,
      totalCredits: user.credits,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserCompletedTasks = async (req, res) => {
  try {
    const { userId } = req.params;
    const tasks = await UserTask.find({ userId }).populate("taskId");
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { completeTask, getUserCompletedTasks };