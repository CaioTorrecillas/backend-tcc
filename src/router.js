//ARQUIVO ONDE DEIXAREMOS NOSSAS ROTAS 

const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');
const userMiddleware = require('../src/middlewares/userMiddleware')


router.get("/usuarios", userController.getAll)
//esse validar é pra valdar os dados
router.post("/usuarios", userController.createUser)
router.delete("/usuarios/:id", userController.deleteUser)
router.put("/usuarios/:id", userController.updateUser)


module.exports = router;