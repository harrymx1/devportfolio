const express = require('express');
const router = express.Router();
const {
  getAllExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
} = require('../controllers/experienceController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', getAllExperiences);
router.get('/:id', getExperienceById);

// Protected routes (Admin only)
router.post('/', protect, createExperience);
router.put('/:id', protect, updateExperience);
router.delete('/:id', protect, deleteExperience);

module.exports = router;
