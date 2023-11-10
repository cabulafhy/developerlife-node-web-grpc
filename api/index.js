const express = require('express')
const sqlite3 = require('sqlite3')
sqlite3.verbose()

const { open } = require('sqlite')

const services = require('./src/proto/lista_grpc_pb')
const messages = require('./src/proto/lista_pb')
const grpc = require('@grpc/grpc-js');

const app = express()
const port = 3000;

const adress = '0.0.0.0:3001';

const client = new services.ListaClient(
    adress,
    grpc.credentials.createInsecure()
)


let db = null;

// var - consigo subescrever a variavel
// let - consigo subescrever a variavel
// const - não consigo subescrever

async function iniciarBanco(){
    db = await open({
        filename:"./database.db",
        driver: sqlite3.Database
    })

    db.exec(`CREATE TABLE IF NOT EXISTS lista (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tipo TEXT NOT NULL,
        descricao TEXT NOT NULL
    )`)
}

app.use(express.json()) //parsear as requests em json


// undefined  == false
// null == false
// "" == false
// {} == true
app.post('/lista', async (req, res)=>{
    try {
        const body = req.body;

        if (body && body.tipo && body.descricao) {
            const result =  await db.exec(`INSERT INTO lista(tipo, descricao) values ('${body.tipo}', '${body.descricao}')`)
            console.log(result)

            const request = new messages.CadastroResquest()

            request.setTipo(body.tipo)
            request.setDescricao(body.descricao)

            const resultGrpc = await new Promise((resolve, reject) =>{
                client.cadastro(request, function(err, response) {
                    if (err) {
                        console.log('errooooo ' + err);
                        reject(err);
                        return;
                    }
                    resolve(response.getMessage());  
                })
            })
        }else{
            return res.status(400).json({"mensagem": "Você precisa informar um item completo para cadastralo"})
        }
    
        res.send('Ok, cadastrado')
    } catch(err){
        console.log(err)
        res.status(500).json({"mensagem": "Ocorreu um erro ao cadastrar o item da lista", err})
    }
})

app.get('/lista', async (req, res)=>{
    try{
    
        const request = new messages.ConsultaRequest()

        request.setId(4)

        const resultGrpc = await new Promise((resolve, reject) =>{
            client.listar(request, function(err, response) {
                if (err) {
                    console.log('errooooo ' + err);
                    reject(err);
                    return;
                  }
                  resolve(response.getMessage());  
            })
        })

        console.log('resultado grpc:')
        console.log(resultGrpc)

        const result = await db.all('SELECT * FROM lista')
        res.send(resultGrpc)
    }catch(err) {
        console.log(err)
        res.status(500).json({"mensagem": "Ocorreu um erro ao cadastrar o item da lista", err})
    }
})

app.get('/lista/query', async (req, res)=>{
    try{
        const query = req.query
        if(!query.id){
            res.status(400).json({"mensagem": "Você precisa informar o id para consulta"})
        }
        const result = await db.get(`SELECT * FROM lista where id = ?`, query.id)
        if (!result) {
            res.status(404).json({"mensagem": "Nenhum item encontrado"})
        }
        res.json(result)
    }catch(err) {
        console.log(err)
        res.status(500).json({"mensagem": "Ocorreu um erro ao cadastrar o item da lista", err})
    }
})


app.listen(port, ()=>{
    iniciarBanco()
    console.log(`listening on port ${port}`)
})