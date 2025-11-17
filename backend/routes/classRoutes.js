const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const { auth, isTrainer } = require('../middleware/auth');

router.get('/', classController.getAllClasses);
router.get('/:id', classController.getClassById);
router.post('/', auth, isTrainer, classController.createClass);
router.put('/:id', auth, isTrainer, classController.updateClass);
router.delete('/:id', auth, isTrainer, classController.deleteClass);

module.exports = router;