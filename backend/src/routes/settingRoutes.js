const express = require('express');
const router = express.Router();
const {
  getSettings,
  updateSettings,
} = require('../controllers/settingController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', getSettings);
router.post('/', protect, updateSettings);

module.exports = router;
