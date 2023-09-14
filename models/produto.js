const Sequilize = require('sequelize');
const database = require('../db');


const Produto = database.sequelize.define('produto', {
    //aqui faremos o mapeamento
    id: {
        type: Sequilize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    nome:{
        type: Sequilize.STRING(150),
        allowNull: false,

        
    },
    preco: Sequilize.DECIMAL,
    descricao:{
        type: Sequilize.STRING
    }

})

module.exports = Produto;