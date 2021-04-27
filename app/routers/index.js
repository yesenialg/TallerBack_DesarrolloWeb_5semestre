const express = require('express');

const router = express.Router();
const _estudiantesController = require('../controllers/estudiates/estudiantes.controller')

router
    .get('/estudiantes', _estudiantesController.getUsers)
    .post('/estudiantes', _estudiantesController.createUser);

module.exports = router;