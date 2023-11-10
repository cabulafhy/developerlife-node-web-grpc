const {listar, cadastro} = require('./src/metodos')
const grpc = require('@grpc/grpc-js')

const {ListaService} = require('./src/proto/lista_grpc_pb')

const startServer = function () {
    const adress = '0.0.0.0:3001';
    const server = new grpc.Server()

    server.addService(ListaService, {
        listar, cadastro
    })

    server.bindAsync(adress, grpc.ServerCredentials.createInsecure(),
    (err, port)=>{
        if (err) {
            console.log(
              `Erro ao iniciar servidor gRPC na porta: ${port} \n Erro: ${err}`
            )
            return
          }
    
        server.start()
        console.log('Servidor gRPC iniciado')
    })
}


startServer();