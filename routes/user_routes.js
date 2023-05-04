const express = require('express');
const app = express();

const userController = require('../controllers/user_controller');

const router = express.Router();

router.post('/add', userController.create);

router.get('/retrieve', userController.findAll);

router.get('/one/:user_id', userController.findOne)

router.put('/update/:userId', userController.update);

router.delete('/delete', userController.delete);

app.use('/api/users', router);

module.exports = app;

