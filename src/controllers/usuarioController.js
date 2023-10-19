const usuarioModel = require('../models/usuarioModel')
const { Expo } = require('expo-server-sdk')

module.exports = {
    async enviarNotificacao(request, response) {
        let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });
        const { id } = request.params;
        const usuario = await usuarioModel.findOne({
            where: { id: id },
        });
    
        if (usuario) {
            const pushToken = usuario.token;
            console.log(pushToken);
    
            // Verifique que o pushToken é um token Expo válido
            if (!Expo.isExpoPushToken(pushToken)) {
                console.error(`Push token ${pushToken} is not a valid Expo push token`);
            } else {
                // Construa a mensagem
                const message = {
                    to: pushToken,
                    sound: 'default',
                    body: 'Um usuário auxiliar aceitou sua corrida',
                    data: { withSome: 'data' },
                };
    
                // Envie a notificação
                try {
                    const tickets = await expo.sendPushNotificationsAsync([message]);
                    console.log(tickets);
                    response.status(200).json({message: "Notificação enviada"})
                } catch (error) {
                    console.error(error);
                    response.status(400).json({message: "Notificação com má envio"})
                }
            }
        } else {
            response.status(401).json({ message: "Nenhum usuário encontrado" });
        }
    },
    
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
            } else {
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
            } else {
                response.status(400).json({ message: "Usuario nao pode ser criado sem nenhum atributo" })
            }

        } catch (error) {
            response.status(400).json({ error: error.message })
        }

    },

    async createToken(request, response) {
        try {
            const { id } = request.params;
            const { token } = request.body;
            const usuario = await usuarioModel.findOne({
                where: { id: id },
            });
            console.log(id)
            console.log(usuario.token)
            if (!usuario) {
                response.status(400).json({ message: 'Usuário não encontrado' });
            } else {
                if (usuario.tipo === 'pcd' || usuario.tipo === 'PCD' || usuario.tipo === 'Pcd') {
                    if (usuario.token === null || usuario.token === undefined || usuario.token === "") {
                        await usuarioModel.update({ token }, { where: { id } });
                        response.status(200).json({ message: "Token adicionado" });
                    } else {
                        response.status(200).json({ message: "Usuario ja tem token" });
                    }


                } else {
                    response.status(403).json({ message: 'Apenas usuários "pcd" podem adicionar um token.' });
                }
            }
        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error });
        }
    },
    async buscarTokenByID(request, response) {
        try {
            const { id } = request.params;
            const usuario = await usuarioModel.findOne({
                where: { id: id },
            });
            if (!usuario) {
                response.status(400).json({ message: 'Usuário não encontrado' });
            } else {
                if (usuario.token) {
                    let token = usuario.token;
                    response.status(200).json(token);
                }

            }
        } catch (error) {
            response.status(500).json({ error: error });
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