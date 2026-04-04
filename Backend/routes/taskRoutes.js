// LOCATION: Backend/routes/taskRoutes.js  (REPLACE existing)
// Includes thumbnail in list endpoint so task cards can show uploaded images

const express = require("express");
const router  = express.Router();
const Task    = require("../models/Task");
const mongoose = require("mongoose");

const TASK_LIST_FIELDS = "title description thumbnail platform reward timeMinutes link expiresAt isActive createdAt";

// GET /api/tasks  — list, includes thumbnail
router.get("/", async (req, res) => {
  try {
    const now   = new Date();
    const tasks = await Task.find({ isActive: true })
      .sort({ createdAt: -1 })
      .select(TASK_LIST_FIELDS)
      .lean();

    // Mark expired but still return them so user context can also filter
    const result = tasks.map((t) => ({
      ...t,
      expired: t.expiresAt ? now > new Date(t.expiresAt) : false,
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/tasks/:id  — single task WITH thumbnail (loaded when modal opens)
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: "Task not found" });
    }

    const task = await Task.findById(req.params.id)
      .select(TASK_LIST_FIELDS)
      .lean();
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/tasks  (kept for backward compat — prefer /api/admin/tasks)
router.post("/", async (req, res) => {
  try {
    const { title, platform, reward, timeMinutes, link } = req.body;
    const task = await Task.create({ title, platform, reward, timeMinutes, link });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;