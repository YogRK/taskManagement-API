const Label = require('../models/labelSchema');

// Create a new label
exports.createLabel = async (req, res) => {
  try {
    const label = new Label(req.body);
    await label.save();
    res.status(201).json(label);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all labels
exports.getLabels = async (req, res) => {
  try {
    const labels = await Label.find().populate('organizationId');
    res.status(200).json(labels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a label by ID
exports.getLabelById = async (req, res) => {
  try {
    const label = await Label.findById(req.params.id).populate('organizationId');
    if (!label) return res.status(404).json({ error: 'Label not found' });
    res.status(200).json(label);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a label by ID
exports.updateLabel = async (req, res) => {
  try {
    const label = await Label.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!label) return res.status(404).json({ error: 'Label not found' });
    res.status(200).json(label);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a label by ID
exports.deleteLabel = async (req, res) => {
  try {
    const label = await Label.findByIdAndDelete(req.params.id);
    if (!label) return res.status(404).json({ error: 'Label not found' });
    res.status(200).json({ message: 'Label deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
