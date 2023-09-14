//Arquivo com conexao com o banco
//carregamento pacorte do sql
const mysql = require("mysql2/promise");
require('dotenv').config();
//criando conexao com o banco 
//usaremos o pool de conexao onde abrimos uma conexao onde abrimos e fechamos automaticamente. (Mais profissional)
const connection = mysql.createPool({
    host: process.env.DATABASE_HOST,
    password: process.env.DATABASE_PASSWORD,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME, 
})




module.exports = connection;



//esse sequelize é uma classe, por isso a razao do S maiusculo
//const Sequilize = require("sequelize");
//no construtor da classe passamos as configs do banco
//const sequelize = new Sequilize('nodetcc', 'root', 'root', {
    //dialect: 'mysql',
   // host: '127.0.0.1',
   // port: '3306'
//});