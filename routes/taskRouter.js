const express = require('express');
const { createTask, getAllTasks, getTaskById, updateTask, deleteTask } = require('../controllers/taskController');
const { createTaskSchema } = require('../validation/taskValidation');
const validate = require('../middlewares/validate');

const router = express.Router();

router.post('/task', validate(createTaskSchema), createTask);
router.get('/all-tasks', getAllTasks);
router.get('/one-task/:id', getTaskById);
router.put('/update-task/:id', updateTask);
router.delete('/delete-task/:id', deleteTask);

module.exports = router; 