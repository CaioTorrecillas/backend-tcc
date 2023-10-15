const usuarioModel = require('../models/usuarioModel');



module.exports = {
    async login(request, response) {
        try {
            const { name, senha }  = request.body
            const usuarioUnico = await usuarioModel.findOne({ where: { name, senha } })
            if(!usuarioUnico){
                return response.status(401).json({ message: 'Usuário não autorizado' }).send();
            }else{
                response.status(200).json({ usuarioUnico });
            }

        } catch (error) {
            response.status(400).json({ error: error.message })
        }
    },
}