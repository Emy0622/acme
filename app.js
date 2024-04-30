// Para fazer as integrações com o banco de dados, precisamos ultilizar uma dependencia
// SEQUELIZE    ORM
// PRISMA       ORM
// FASTFY       ORM

// prisma

// npm install prisma --save
// npm install @prisma/client --save


// npx prisma init


const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const funcoes = require('./controller/funcoes.js')

const app = express()

app.use((request, response, next) => {

    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, SELECT, DELETE, POST')
    app.use(cors)
    next()
})

// cria um objeto do tipo json para receber dados via body nas requisições post ou put
const bodyParserJSON = bodyParser.json()

//importação de arquivos e bibliotecas do projeto

const controllerFilmes = require('./controller/controller_filme.js')

// ------------------------------------------------------------------------------------------------------------------------


app.get('/v1/acme/filmes', cors(), function(request, response, next) {

    let controllerFilmes = require('./controller/funcoes.js')

    let filmes = controllerFilmes.getListarFilmes()
    if (filmes) {
        response.json(filmes)
        response.status(200)
    } else {
        response.status(404)
    }
})

app.get('/v2/acme/filmes', cors(), async function(request, response, next) {

    let dadosFilmes = await controllerFilmes.getListarFilmes();

    if (dadosFilmes) {
        response.json(dadosFilmes)
        response.status(200)
    } else {
        response.json({ message: 'nenhum registro encontrado' })
        response.status(404)
    }
})

app.listen(8080, function() {
    console.log('API Funcionando e aguardando requisições')
})


app.get('/v2/acme/filme/:id', cors(), async function(request, response, next) {

    // recebe as requisições por id
    let idFilme = request.params.id

    let dadosFilmesPorID = await controllerFilmes.getBuscarFilme(idFilme);
    response.status(dadosFilmesPorID.status_code)
    response.json(dadosFilmesPorID)
})

// endpint para inserir novos filmes do BD
// NÃO ESQUECER DE COLOCAR O BODY PARSER JSON, ELE É QUEM DEFINE O FORMATO DA CHEGADA DOS DADOS

//esse objeto foi criado no inicio do projeto
app.post('/v2/acmefilmes/filme/', cors(), bodyParserJSON, async function(request, response, next) {

    let contentType = request.headers['content-type'];

    // recebe os dados encaminhados na requisição do body(json)
    let dadosBody = request.body;

    let resultDados = await controllerFilmes.setInserirNovoFilme(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)

})

app.delete('/v3/acme/filme/delete/:id', cors(), async function(request, response, next) {

    //recebe a requisição do id
    let idFilme = request.params.id

    let deleteFilmesbyID = await controllerFilmes.setExcluirFilme(idFilme);
    response.status(deleteFilmesbyID.status_code)
    response.json(deleteFilmesbyID)
})

app.get('/v2/acme/filme/:id', cors(), async function(request, response, next) {

    // recebe a requisição do id
    let idFilme = request.params.id

    let dadosFilmesPorID = await controllerFilmes.getBuscarFilme(idFilme);
    response.status(dadosFilmesPorID.status_code)
    response.json(dadosFilmesPorID)
})