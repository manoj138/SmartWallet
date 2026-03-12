const express = require('express');

const router = express.Router();

const userController = require('../controllers/UserController');
const auth = require('../middleware/auth');
const { memoryUpload } = require('../middleware/memoryUpload');

// public Routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// protected Routes
router.get('/user/', auth, userController.index);
router.get('/user/:id/find', userController.find);
router.put('/user/:id/update', memoryUpload("users"), userController.update);
router.delete('/user/:id/delete', userController.deleteU);

module.exports = router;