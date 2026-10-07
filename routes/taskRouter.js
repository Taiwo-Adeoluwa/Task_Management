const express = require('express');
const { createTask, getAllTasks, getTaskById, updateTask, deleteTask } = require('../controllers/taskController');
const { createTaskSchema } = require('../validation/taskValidation');
const validate = require('../middlewares/validate');

const router = express.Router();

router.post('/tasks', validate(createTaskSchema), createTask);
router.get('/all-tasks', getAllTasks);
router.get('/task/:id', getTaskById);
router.put('/task/:id', updateTask);
router.delete('/task/:id', deleteTask);

module.exports = router; 