const messages = require('./proto/lista_pb')

const listar = function(call, callback){
    const [ id ] = call.request.array
    console.log(id);
    const reply = new messages.ConsultaReply()
    reply.setMessage('Olá')

    callback(null, reply)
}


const cadastro = function (call, callback) {
    const [ tipo, descricao ] = call.request.array
    console.log(tipo);
    console.log(descricao);
    
    const reply = new messages.CadastroReply()

    reply.setMessage('Mundo')

    callback(null, reply)
}

module.exports = {
    cadastro,
    listar
}