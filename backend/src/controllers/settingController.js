const settingModel = require('../models/settingModel');

const getSettings = async (req, res) => {
  try {
    const settings = await settingModel.findAll();
    res.json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const updateSettings = async (req, res) => {
  try {
    // req.body should be an object of key-value pairs
    const updatedSettings = await settingModel.updateMultiple(req.body);
    res.json({ success: true, data: updatedSettings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  getSettings,
  updateSettings,
};
