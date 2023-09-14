const app = require('./app')
//essa funcao config procura um arquivo chamado env na aplcacao, como .env que tem infos da porta, para ler e subir para a memoria as configs do nosso .env 
require("dotenv").config();


const PORT = process.env.PORT;

//usaremos a fncao listen para subir o nosso servidor de backend
//passamos essa funcao de callback para nos avisar se a aplicacao subiu com sucesso
app.listen(PORT, () => {

    console.log(`Server running at port ${PORT}`);

});


//Funcao para listar clietnes cadastrados


/*(async () => {

    const Produto = require("../models/produto")
    const db = require("../db");
    await db.sequelize.sync();
    //------------------USANDO SEQUELIZE PARA FAZER CONSULTAS NO BANCO-------------------------------------------------------------
    /*const novoProduto = await Produto.create({
        nome: "Barra de ouro",
        preco: 123,
        descricao: "Desc",
    })
    console.log(novoProduto)*/

    //const produtos = await Produto.findAll();
    //console.log(produtos)
    //const produtos = await Produto.findByPk(1);
    //FILTRO
    /*const produtos = await Produto.findAll({
        where: {
            preco: 123,
        }
    });*/

    //delete
    //const produtos = await Produto.findByPk(1);
    //await produtos.destroy();
        //(delete) ou*/
    //await Produto.destroy({
       // where: {
          //  preco:123,
      //  }
 //   })

    //put
    /*const produtos = await Produto.findByPk(1);
    
    console.log(produtos)
    produtos.descricao = "Alteracao";
    await produtos.save();

})()*/