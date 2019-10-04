const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/',userController.getAllUser);
router.post('/',userController.createUser);
router.post('/:user',userController.getUser);
router.put('/:user',userController.createTask);
router.post('/:user/task',userController.getTasks);
router.put('/:user/task',userController.updateAll);
router.put('/:user/:id',userController.updateTask);
router.delete('/:user/task', userController.deleteAllTaskComplited);
router.delete('/:user/:id',userController.deleteTodo);

module.exports = router;
