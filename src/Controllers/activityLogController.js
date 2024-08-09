const ActivityLog = require('../models/activityLogSchema');

// Create a new activity log
exports.createActivityLog = async (req, res) => {
  try {
    const activityLog = new ActivityLog(req.body);
    await activityLog.save();
    res.status(201).json(activityLog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all activity logs
exports.getActivityLogs = async (req, res) => {
  try {
    const activityLogs = await ActivityLog.find().populate('userId');
    res.status(200).json(activityLogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get an activity log by ID
exports.getActivityLogById = async (req, res) => {
  try {
    const activityLog = await ActivityLog.findById(req.params.id).populate('userId');
    if (!activityLog) return res.status(404).json({ error: 'ActivityLog not found' });
    res.status(200).json(activityLog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an activity log by ID
exports.updateActivityLog = async (req, res) => {
  try {
    const activityLog = await ActivityLog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!activityLog) return res.status(404).json({ error: 'ActivityLog not found' });
    res.status(200).json(activityLog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an activity log by ID
exports.deleteActivityLog = async (req, res) => {
  try {
    const activityLog = await ActivityLog.findByIdAndDelete(req.params.id);
    if (!activityLog) return res.status(404).json({ error: 'ActivityLog not found' });
    res.status(200).json({ message: 'ActivityLog deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
