const express = require('express');
const app = express();

const lightController = require('../controllers/light_controller');

const router = express.Router();

router.post('/', lightController.create);

router.get('/', lightController.findAll);

router.put('/update/:lightId', lightController.update);

router.delete('/delete', lightController.delete);

app.use('/api/light', router);

module.exports = app;

