const express = require('express');    //para criar rotas - endereço adicional
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const http = require('http'); //
const { setupWebsocket } = require('./WebSocket');


const app = express();
const server = http.Server(app);      // servidor fora do express

setupWebsocket(server);

mongoose.connect('mongodb+srv://meuomnistack:meuomnistack@cluster0-ww9fw.mongodb.net/week10?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})


app.use(cors());
app.use(express.json()); //para todas as rotas
app.use(routes);
//Métodos HTTP: get, post, put, delete

//Tipos de parametros:
//Query params: apenas no get, visível na URL, são acessados por req.query (Filtro, ordenação, paginação....)
//Route Params: put ou delete: um usuário, são acessados por req.params (identificar um recurso na alteração ou deleção)
//Body: post ou put, são acessádos por req.body (dados para criação ou alteração de registro

//MongoDB (não-relacional)



server.listen(3333);