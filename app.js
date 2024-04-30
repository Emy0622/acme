// Para fazer as integrações com o banco de dados, precisamos ultilizar uma dependencia
// SEQUELIZE    ORM
// PRISMA       ORM
// FASTFY       ORM

// prisma

// npm install prisma --save
// npm install @prisma/client --save


// npx prisma init
//________________________________________________________________________________________________________________________
// Definimos as dependências que vamos usar no projeto.
// Aqui temos o express para criar o servidor, o cors para lidar com as permissões de acesso,
// e o body-parser para analisar os corpos das solicitações HTTP.
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// Em seguida, importamos as funções controladoras do nosso projeto.
const funcoes = require('./controller/funcoes.js').default

// Inicializamos o aplicativo Express.
const app = express()

// Configuramos o CORS para permitir solicitações de qualquer origem.
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, SELECT, DELETE, POST')
    app.use(cors)
    next()
})

// Configuramos o body-parser para analisar corpos JSON.
const bodyParserJSON = bodyParser.json()

// Importamos o controlador de filmes.
const controllerFilmes = require('./controller/controller_filme.js')

// Aqui começamos a definir os endpoints da nossa API.

// Definimos um endpoint para obter uma lista de filmes.
app.get('/v1/acme/filmes', cors(), function(request, response, next) {
    let controllerFilmes = require('./controller/funcoes.js').default
    let filmes = controllerFilmes.getListarFilmes()
    if (filmes) {
        response.json(filmes)
        response.status(200)
    } else {
        response.status(404)
    }
})

// Definimos um endpoint assíncrono para obter uma lista de filmes usando async/await.
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

// Definimos um endpoint para obter detalhes de um filme por ID.
app.get('/v2/acme/filme/:id', cors(), async function(request, response, next) {
    let idFilme = request.params.id
    let dadosFilmesPorID = await controllerFilmes.getBuscarFilme(idFilme);
    response.status(dadosFilmesPorID.status_code)
    response.json(dadosFilmesPorID)
})

// Definimos um endpoint para inserir um novo filme no banco de dados.
app.post('/v2/acmefilmes/filme/', cors(), bodyParserJSON, async function(request, response, next) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;
    let resultDados = await controllerFilmes.setInserirNovoFilme(dadosBody, contentType)
    response.status(resultDados.status_code)
    response.json(resultDados)
})

// Definimos um endpoint para excluir um filme do banco de dados por ID.
app.delete('/v3/acme/filme/delete/:id', cors(), async function(request, response, next) {
    let idFilme = request.params.id
    let deleteFilmesbyID = await controllerFilmes.setExcluirFilme(idFilme);
    response.status(deleteFilmesbyID.status_code)
    response.json(deleteFilmesbyID)
})

// Finalmente, iniciamos o servidor Express na porta 8080.
app.listen(8080, function() {
    console.log('API Funcionando e aguardando requisições')
})