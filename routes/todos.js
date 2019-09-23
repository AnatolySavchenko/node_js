const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.post('/',todoController.createTask);
router.get('/',todoController.getAllTask);
router.put('/',todoController.updateAll);
router.put('/:id',todoController.updateTask);
router.delete('/',todoController.deleteAllTaskComplited);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;

