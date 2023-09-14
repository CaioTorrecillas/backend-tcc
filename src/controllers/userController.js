const userModel = require('../models/userModel')



const getAll = async (request, response) => {


    const users = await userModel.getAll();
    return response.status(200).json(users);
}
const createUser = async (request, response) => {
    const users = await userModel.createUser(request.body);
    return response.status(200).json(users); 
}

const deleteUser = async (request, response) => {
    const id = parseInt(request.params.id);
    await userModel.deleteUser(id);
    return response.status(204). 
}
const updateUser = async (request, response) => {
    const {id} = parseInt(request.params.id);
    await userModel.updateUser(id, request.body);
    return response.status(204).json(); 
}

module.exports = {
    updateUser,
    deleteUser,
    createUser,
    getAll,
}