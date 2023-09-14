//ANTES DO BANCO DE DADOS-----------------ESSE ARQUIVO EXISTE COMO EXERCICIO ANTES DE MEXER COM BANCO DE DADOS-------------------------------------
//Pegando dados em memoria
//Arquivo feito para a modularizacao do banco

//carregamento pacorte do sql
//const mysql = require("mysql2/promise");

//esse sequelize é uma classe, por isso a razao do S maiusculo
const Sequilize = require("sequelize");
//no construtor da classe passamos as configs do banco
const sequelize = new Sequilize('nodetcc', 'root', 'root', {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: '3306'
});


//criando conexao com o banco 
//usaremos o pool de conexao onde abrimos uma conexao onde abrimos e fechamos automaticamente. (Mais profissional)
//const client = mysql.createPool(process.env.CONNECTION_STRING)


/*const customers = [{
    id: 1,
    name:'João', 
    idade: 21,
    uf: 'Sp'
}];*/

//funcao para que tudo desse arquvo seja acessado 
//Quando a funcao tem awai, colocamos async
/*async function selectCustomers(){
    //IMPORTANTE o retorno de banco de dados nao é instantaneo, precisamos usar await
    //esseawait significa que "Só va apara a linha de baixo quando tiver algo em results"
    const results = await client.query("select * from clientes;")
   //fazemos isso pois o results armazena varias coisas, queremos apenas o q vem na posicao 0 ( oque nos interessa)
    return  results[0];
}

async function selectCustomersById(id){
    const results = await client.query("select * from clientes where id=?", [id]);
    return results[0];
       
   
}

async function saveCustomers(customer){
    const values = [customer.name, customer.endereco, customer.tipoUsuario, customer.ativo, customer.telefone]
    await client.query("insert into clientes (name, endereco, tipoUsuario, ativo, telefone) values (?,?,?,?,?) ", values);  
   
}
async function putCustomer(id, customer){
    const values = [customer.name, customer.endereco, customer.tipoUsuario, customer.ativo, customer.telefone, id]
    await client.query("update clientes set name=?, endereco=?, tipoUsuario=?, ativo=?, telefone=? where id=?", values);       
    
}

async function deleteCustomer(id){

    await client.query("delete from clientes where id=?", id);   
    
}*/
//exportando funcao
module.exports = {
    //selectCustomers,
    //selectCustomersById,
    //saveCustomers,
    //putCustomer,
    //deleteCustomer,
    sequelize,
}