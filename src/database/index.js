//carrega configs de conexao com banco

const Sequilize = require("sequelize");

//no construtor da classe passamos as configs do banco
const configDatabase = require("../config/database")

const Usuario = require('../models/usuarioModel');

const Jornada = require("../models/jornadaModel");



const connection = new Sequilize(configDatabase)

//conectamos nosso modelo com a nossa tabela do banco
Usuario.init(connection)
Jornada.init(connection)

Jornada.associar(connection.models)
Usuario.associar(connection.models)

module.exports = connection;