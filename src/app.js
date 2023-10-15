//NESSE ARQUIVO SO VAMOS IMPORTAR NOSSAS ROTAS  
//carregando bibliotecas com essa funcao require. Funcao que inicializa uma nova aplicacao
const express = require('express');
const router = require('./router')
const app = express();


require('./database/')
//Tranformando dados de bites para json
app.use(express.json());
//Toda requisicao ira cair dentro do router. Dentro do router vamos ter as rotas
app.use(router);



module.exports = app;