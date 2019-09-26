const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/signIn',userController.createUser);
router.post('/logIn',userController.getUser);

module.exports = router;
