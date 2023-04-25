const express = require('express');
const app = express();

const userController = require('../controller');

const router = express.Router();

router.post('/add', userController.create);

router.get('/retrieve', userController.findAll);

router.put('/update', userController.update);

router.delete('/delete', userController.delete);

app.use('/api/users', router);

module.exports = app;

