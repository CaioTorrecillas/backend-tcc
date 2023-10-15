const usuarioModel = require('../models/usuarioModel')


module.exports = {
    async getAllUsuarios(request, response) {
        try {

            const usuarios = await usuarioModel.findAll();
            if (!usuarios) {
                response.status(401).json({ message: "Nao foram encontrados nenhum usuario" })
            }
            response.status(200).json({ usuarios });



        } catch (error) {
            response.status(400).json({ error })
        }
    },
  
    async getByUsuario(request, response) {
        try {
            const { user_id } = request.params;
            const usuario = await usuarioModel.findByPk(user_id);
            if (!usuario) {
                return response.status(404).json({ message: 'Usuário não encontrado' });
            }else{
                response.status(200).json(usuario);
            }
          
        } catch (error) {
            response.status(500).json({ error: error.message });
        }


    },
    async createUsuario(request, response) {
        try {
            const {
                name, senha, idade, tipo, telefone
            } = request.body
          
            if (name && senha && idade && tipo && telefone) {
                const usuarioNovo = await usuarioModel.create({ name, senha, idade, tipo, telefone })
                response.status(200).json({ usuarioNovo })
            }else{
                response.status(400).json({ message: "Usuario nao pode ser criado sem nenhum atributo" })
            }
        
        } catch (error) {
            response.status(400).json({  error: error.message })
        }

    },
    async updateUsuario(request, response) {

        try {
            const { id } = request.params;
            const { name, senha, idade, tipo, conta_ativa } = request.body

            const usuarioUnico = await usuarioModel.findOne({ where: { id } })
            if (!usuarioUnico) {
                response.status(401).json({ message: "Nenhum usuario encontrado" })
            } else {
                const usuarioEditado = await usuarioModel.update({ name, senha, idade, tipo, conta_ativa }, { where: { id } });
                response.status(200).json({ usuarioEditado });
            }


        } catch (error) {
            response.status(400).json({ error: error.message })
        }

    },
    async deleteUsuarios(request, response) {
        const { id } = request.params;
        const usuarioExistente = await usuarioModel.findOne({ where: { id } });
        if (!usuarioExistente) {
            response.status(401).json({ message: "Esse usuario nao foi encontrado" })
        } else {
            await usuarioModel.destroy({ where: { id } });
            response.status(200).json({ message: "Usuario deletado" })
        }

    }





}