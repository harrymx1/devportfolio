const experienceModel = require('../models/experienceModel');

const getAllExperiences = async (req, res) => {
  try {
    const experiences = await experienceModel.findAll();
    res.json({ success: true, data: experiences });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getExperienceById = async (req, res) => {
  try {
    const experience = await experienceModel.findById(req.params.id);
    if (!experience) return res.status(404).json({ success: false, message: 'Experience not found' });
    res.json({ success: true, data: experience });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const createExperience = async (req, res) => {
  try {
    const newExperience = await experienceModel.create(req.body);
    res.status(201).json({ success: true, data: newExperience });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const updateExperience = async (req, res) => {
  try {
    const updatedExperience = await experienceModel.update(req.params.id, req.body);
    if (!updatedExperience) return res.status(404).json({ success: false, message: 'Experience not found' });
    res.json({ success: true, data: updatedExperience });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const deleteExperience = async (req, res) => {
  try {
    const deletedExperience = await experienceModel.remove(req.params.id);
    if (!deletedExperience) return res.status(404).json({ success: false, message: 'Experience not found' });
    res.json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  getAllExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
};
