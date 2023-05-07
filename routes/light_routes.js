const express = require('express');
const app = express();

const lightController = require('../controllers/light_controller');

const router = express.Router();

router.post('/add', lightController.create);

router.get('/one/:light_id', lightController.findAll);

router.put('/update/:light_id', lightController.update);

router.delete('/delete', lightController.delete);

app.use('/api/light', router);

module.exports = app;

