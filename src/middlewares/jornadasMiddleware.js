const validateBody = (request, response, next) => {

    const { body } = request;
    if(!body.name){
        response.status(400).json({message: "error name"})
    }

}

module.exports = {
     validateBody,
}