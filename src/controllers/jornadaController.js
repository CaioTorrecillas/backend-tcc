const jornadaModel = require('../models/jornadaModel')
const usuarioModel = require('../models/usuarioModel')

module.exports = {
    async getAllJornadasByUsuario(request, response) {
        try {
            const { user_id } = request.params;
            const usuarioUnico = await usuarioModel.findByPk(user_id, {
                include: {
                    association: 'jornadas'
                }
            })
            console.log()
            response.status(200).json({ usuarioUnico });



        } catch (error) {
            response.status(400).json({ error: error.message })
        }
    },
    async createJornada(request, response) {
        
        try {
            const { user_id } = request.params;
            
            const {
                desc_aux, desc_pcd, cep_origem, cep_destino, numero_origem, numero_destino, telefone_pcd
            } = request.body
            const jornadaExistente = await jornadaModel.findOne({
                where: {
                    ativo: 1,
                    user_id: user_id
                },
            });
            console.log(jornadaExistente)
            const usuarioUnico = await usuarioModel.findByPk(user_id)
            console.log(usuarioUnico)
            if (!usuarioUnico) {
                response.status(401).json({ message: "Nenhum usuario encontrado" })
            } else {
                if (jornadaExistente) {
                    response.status(400).json({ message: "O usuário já possui uma jornada ativa." });
                }else{
                    if(cep_origem && cep_destino && numero_origem && numero_destino && telefone_pcd){
                        const jornadaNova = await jornadaModel.create({
                            user_id, desc_aux, desc_pcd, cep_origem, cep_destino, numero_origem, numero_destino, telefone_pcd
                        })
                        response.status(200).json({ jornadaNova })
                    }else{
                        response.status(400).json({ message: "Preencha todos os campos da jornada"  })
                    }
                   
                }
              
            }

        } catch (error) {
            response.status(400).json({ error: error.message })
        }

    },
    async getAllJornadas(request, response) {
        try {
            const todasJornadas = await jornadaModel.findAll( {include: [{ model:  usuarioModel, as: 'usuario'}]});

            if (!todasJornadas) {

                response.status(400).json({ message: "Nenhuma jornada foi encontrada" })
            } else {
                response.status(200).json({ todasJornadas });
            }
        } catch (error) {
            response.status(400).json({ error: error.message })
        }
    },
    async getActiveJornada(request, response) {
        try {
            const { user_id } = request.params;
    
            // Consulta todas as jornadas que atendem aos critérios
            const jornadaExistente = await jornadaModel.findOne({
                where: {
                    ativo: 1,
                    user_id: user_id
                },
            });
    
            if (jornadaExistente) {
                response.status(200).json({ jornadaExistente });
            } else {
                response.status(404).json({ message: "Nenhuma jornada foi encontrada"})
            }
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    },
    async deleteJornadaByUserId(request, response) {
        try {
            const { user_id } = request.params;
            const {id} = request.params
            const usuario = await usuarioModel.findByPk(user_id);
            const jornadaExistente = await jornadaModel.findOne({ where: { id } });
            if (!usuario) {
                return response.status(404).json({ message: 'Usuario não encontrado' });
            } else {
                if (!jornadaExistente) {
                    response.status(401).json({ message: "Essa jornada nao foi encontrado" })
                } else {
                    await jornadaModel.destroy({
                        where: { id },
                    });
                    response.status(200).json({ message: "Jornada deletada com sucesso" })
                }
            }

        } catch (error) {
            response.status(400).json({ error: error.message });
        }
    },
    async aceitarJornada(request, response) {
        try {
            const { id } = request.params;
            const { user_id } = request.params;
            const { desc_aux, aceito, nome_aux, telefone_aux} = request.body
            const usuario = await usuarioModel.findByPk(user_id);
       
            const jornadaUnica = await jornadaModel.findOne({where: { id }});
            if(!usuario){
                return response.status(404).json({ message: 'Usuario não encontrado' });
            }else{
                if (!jornadaUnica) {
                    return response.status(404).json({ message: 'Jornada não encontrada' });
                }else{
                    jornadaUnica.aceito = aceito;
          
                    jornadaUnica.desc_aux = desc_aux;
                    const jornadaAceita = await jornadaModel.update({ desc_aux, aceito, nome_aux, telefone_aux }, { where: { id } });
                    const jornadaAtualizada = await jornadaModel.findByPk(id, {
                        attributes: ['desc_aux', 'aceito', 'telefone_aux', 'nome_aux'],
                    });

                    response.status(200).json({ jornadaAtualizada});
                }
            }
            
          
        } catch (error) {
            response.status(400).json({ error: error.message });
        }
    },
    async terminarJornada(request, response) {
        try {
            const { id } = request.params;
            const { user_id } = request.params;
            const { aceito, ativo} = request.body
            const usuario = await usuarioModel.findByPk(user_id);
       
            const jornadaUnica = await jornadaModel.findOne({where: { id }});
            if(!usuario){
                return response.status(404).json({ message: 'Usuario não encontrado' });
            }else{
                if (!jornadaUnica) {
                    return response.status(404).json({ message: 'Jornada não encontrada' });
                }else{
                    if(jornadaUnica.aceito != 0 && jornadaUnica.ativo != 0){
                        jornadaUnica.aceito = aceito;
                        jornadaUnica.ativo = ativo;
                        await jornadaModel.update({ aceito, ativo }, { where: { id } });
                        response.status(200).json({ message: "Jornada terminada" });         
                    }else{
                        return response.status(404).json({ message: 'Jornada ja foi terminada' });
                    }
                   
                }
            }
            
          
        } catch (error) {
            response.status(400).json({ error: error.message });
        }
    }

    /*async updateUsuario(request, response) {

        try {
            const { id } = request.params;
            const { name, senha, idade, tipo, conta_ativa } = request.body

            const usuarioUnico = await userModel.findOne({ where: { id } })
            if (!usuarioUnico) {
                response.status(401).json({ message: "Nenhum usuario encontrado" })
            } else {
                const usuarioEditado = await userModel.update({ name, senha, idade, tipo, conta_ativa }, { where: { id } });
                response.status(200).json({ usuarioEditado });
            }


        } catch (error) {
            response.status(400).json({ error })
        }

    },
    async deleteUsuarios(request, response) {
        const { id } = request.params;
        const usuarioExistente = await userModel.findOne({ where: { id } });
        if (!usuarioExistente) {
            response.status(401).json({ message: "Esse usuario nao foi encontrado" })
        } else {
            await userModel.destroy({ where: { id } });
            response.status(200).json({ message: "Usuario deletado" })
        }

    }*/





}