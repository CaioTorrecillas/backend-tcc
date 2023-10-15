//ARQUIVO ONDE DEIXAREMOS NOSSAS ROTAS 

const express = require('express');
const router = express.Router();
const usuarioController = require('./controllers/usuarioController');
const loginController = require('./controllers/loginController')
const jornadaController = require('./controllers/jornadaController');
//const userMiddleware = require('../src/middlewares/userMiddleware')


router.post("/login", loginController.login)

router.get("/usuarios", usuarioController.getAllUsuarios)
//esse validar é pra valdar os dados
//router.post("/usuarios", usuarioController.createUser)

router.delete("/usuarios/:id", usuarioController.deleteUsuarios)
router.put("/usuario-editar/:id", usuarioController.updateUsuario)
router.post('/usuario', usuarioController.createUsuario)
router.get("/usuario/:user_id", usuarioController.getByUsuario)
router.get("/usuario/:user_id/jornadas", jornadaController.getAllJornadasByUsuario)


router.get("/jornadas", jornadaController.getAllJornadas)
router.get("/usuario/:user_id/jornada/ativas", jornadaController.getActiveJornada)
router.post("/usuario/:user_id/jornada", jornadaController.createJornada)
router.delete("/usuario/:user_id/jornada/:id", jornadaController.deleteJornadaByUserId)
router.put("/usuario/:user_id/jornada/:id/aceitar", jornadaController.aceitarJornada)
router.put("/usuario/:user_id/jornada/:id/terminar", jornadaController.terminarJornada)




module.exports = router;