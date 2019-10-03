const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/',userController.getAllUser);
router.post('/',userController.createUser);
router.post('/:user',userController.getUser);
router.get('/:user',userController.getTasks);
router.put('/:user',userController.createTask);
// router.get('/',userController.getAllTask);
// router.put('/',userController.updateAll);
// router.put('/:id',userController.updateTask);
// router.delete('/',userController.deleteAllTaskComplited);
// router.delete('/:id', userController.deleteTodo);

module.exports = router;
