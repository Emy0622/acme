//******************************************************************************************************************************************************* */
// Para fazer as integracoes com o banco de dados, precisamos ultilizar uma dependencia
// SEQUELIZE    ORM
// PRISMA       ORM
// FASTFY       ORM

// prisma

// npm install prisma --save
// npm install @prisma/client --save


// npx prisma init

//******************************************************************************************************************************************************* */

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const funcoes = require('./controller/funcoes.js')
const controllerFilmes = require('./controller/controller_filme.js')
// const controllerdiretores = require('./controller/controller_diretor.js')
const controller_genero = require('./controller/controller_genero.js')
const controllerClassificacao = require('./controller/controller_classificacao.js')



const app = express()

app.use((request, response, next) => {

    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, SELECT, DELETE, POST')
    app.use(cors)
    next()
})

// cria um obejeto fo tipo json para receber dados via body nas requisições post ou put
const bodyParserJSON = bodyParser.json()

//imports de arquivos e bibliotecas do projeto
// ----------------------------------------------


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

// Filmes

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

    // RECEBE A RRQUISIÇÃO DO ID
    let idFilme = request.params.id

    let dadosFilmesPorID = await controllerFilmes.getBuscarFilme(idFilme);
    response.status(dadosFilmesPorID.status_code)
    response.json(dadosFilmesPorID)
})

// endpoint par ainserir novos filmes do banco de dados
// NAO ESQUECER DE COLOCAR O BODY PARSER JSON, QUE É QUEM DEFINE O FORMATO DE CHEGADA DOS DADOS
// ESSE OBJETO FOI CRIADO NO INICIO DO PROJETO
app.post('/v2/acmefilmes/filme/', cors(), bodyParserJSON, async function(request, response, next) {

    // 
    let contentType = request.headers['content-type']

    console.log(contentType)

    // recebe os dados encaminhados na requisição do body (json)
    let dadosBody = request.body

    let resultDados = await controllerFilmes.setInserirNovoFilme(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)

})

app.put('/v2/acmeFilmes/filme/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let idFilme = request.params.id

    let dadosFilme = await controllerFilmes.setAtualizarFilme(idFilme, dadosBody, contentType)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)
})

app.delete('/v2/acme/filme/delete/:id', cors(), async function(request, response, next) {

    // RECEBE A RRQUISIÇÃO DO ID
    let idFilme = request.params.id

    let deletarFilmesPorID = await controllerFilmes.setExcluirFilme(idFilme);
    response.status(deletarFilmesPorID.status_code)
    response.json(deletarFilmesPorID)
})

// ------------------------------------------------------------------------------------------------

// diretores


app.get('/v2/acme/diretores', cors(), async function(request, response, next) {

    let dadosdiretores = await controllerdiretores.getListardiretores();
    response.status(dadosdiretores.status_code)
    response.json(dadosdiretores)
})

app.get('/v2/acme/diretor/:id', cors(), async function(request, response, next) {

    // RECEBE A RRQUISIÇÃO DO ID
    let idDiretor = request.params.id

    let dadosdiretoresPorID = await controllerdiretores.getBuscardiretor(idDiretor);
    response.status(dadosdiretoresPorID.status_code)
    response.json(dadosdiretoresPorID)
})

app.delete('/v2/acme/diretor/delete/:id', cors(), async function(request, response, next) {

    // RECEBE A RRQUISIÇÃO DO ID
    let idDiretor = request.params.id

    let deletardiretoresPorID = await controllerdiretores.setExcluirdiretor(idDiretor);
    response.status(deletardiretoresPorID.status_code)
    response.json(deletardiretoresPorID)
})

app.post('/v2/acmefilmes/diretor/', cors(), bodyParserJSON, async function(request, response, next) {

    // 
    let contentType = request.headers['content-type']

    console.log(contentType)

    // recebe os dados encaminhados na requisição do body (json)
    let dadosBody = request.body

    let resultDados = await controllerdiretores.setInserirNovodiretor(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)

})

// ------------------------------------------------------------------------------------------------


// Diretores


app.get('/v2/acme/diretores', cors(), async function(request, response, next) {

    let dadosdiretores = await controllerdiretores.getListardiretores();
    response.status(dadosdiretores.status_code)
    response.json(dadosdiretores)
})

app.get('/v2/acme/diretor/:id', cors(), async function(request, response, next) {

    // RECEBE A RRQUISIÇÃO DO ID
    let idDiretor = request.params.id

    let dadosdiretoresPorID = await controllerdiretores.getBuscardiretor(idDiretor);
    response.status(dadosdiretoresPorID.status_code)
    response.json(dadosdiretoresPorID)
})

app.delete('/v2/acme/diretor/delete/:id', cors(), async function(request, response, next) {

    // RECEBE A RRQUISIÇÃO DO ID
    let idDiretor = request.params.id

    let deletardiretoresPorID = await controllerdiretores.setExcluirdiretor(idDiretor);
    response.status(deletardiretoresPorID.status_code)
    response.json(deletardiretoresPorID)
})

app.post('/v2/acmefilmes/diretor/', cors(), bodyParserJSON, async function(request, response, next) {

    // 
    let contentType = request.headers['content-type']

    console.log(contentType)

    // recebe os dados encaminhados na requisição do body (json)
    let dadosBody = request.body

    let resultDados = await controllerdiretores.setInserirNovodiretor(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)

})

// ------------------------------------------------------------------------------------------------

// GENEROS

app.get('/v2/acme/generos', cors(), async function(request, response, next) {

    let dadosGeneros = await controller_genero.getListarGeneros();
    response.status(dadosGeneros.status_code)
    response.json(dadosGeneros)
})

app.get('/v2/acme/genero/:id', cors(), async function(request, response, next) {

    // RECEBE A RRQUISIÇÃO DO ID
    let idGenero = request.params.id

    let dadosGenerosPorID = await controller_genero.getBuscarGenero(idGenero);
    response.status(dadosGenerosPorID.status_code)
    response.json(dadosGenerosPorID)
})

app.delete('/v2/acme/genero/delete/:id', cors(), async function(request, response, next) {

    // RECEBE A RRQUISIÇÃO DO ID
    let idGenero = request.params.id

    let deletarGenerosPorID = await controller_genero.setExcluirGenero(idGenero);
    response.status(deletarGenerosPorID.status_code)
    response.json(deletarGenerosPorID)
})

app.post('/v2/acmefilmes/generos/', cors(), bodyParserJSON, async function(request, response, next) {

    // 
    let contentType = request.headers['content-type']

    console.log(contentType)

    // recebe os dados encaminhados na requisição do body (json)
    let dadosBody = request.body

    let resultDados = await controller_genero.setInserirNovoGenero(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)

})

// ------------------------------------------------------------------------------------------------

// CLASSIFICACAO

app.get('/v2/acme/classificacao', cors(), async function(request, response, next) {

    let dadosClassificacao = await controllerClassificacao.getListarClassificacoes();
    response.status(dadosClassificacao.status_code)
    response.json(dadosClassificacao)
})

app.get('/v2/acme/classificacao/:id', cors(), async function(request, response, next) {

    // RECEBE A RRQUISIÇÃO DO ID
    let idClassificacao = request.params.id

    let dadosClassificacaoporID = await controllerClassificacao.getBuscarClassificacao(idClassificacao);
    response.status(dadosClassificacaoporID.status_code)
    response.json(dadosClassificacaoporID)
})

app.delete('/v3/acme/classificacao/delete/:id', cors(), async function(request, response, next) {

    // RECEBE A RRQUISIÇÃO DO ID
    let idClassificacao = request.params.id

    console.log(idClassificacao)

    let deletarClassificacaoPorID = await controllerClassificacao.setExcluirClassificacao(idClassificacao);
    response.status(deletarClassificacaoPorID.status_code)
    response.json(deletarClassificacaoPorID)
})


app.post('/v2/acmefilmes/classificacao/', cors(), bodyParserJSON, async function(request, response, next) {

    // 
    let contentType = request.headers['content-type']

    console.log(contentType)

    // recebe os dados encaminhados na requisição do body (json)
    let dadosBody = request.body

    let resultDados = await controllerClassificacao.setInserirNovaClassificacao(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)

})

app.put('/v2/acmeFilmes/genero/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let idGenero = request.params.id

    let dadosGenero = await controller_genero.setAtualizarGenero(idGenero, dadosBody, contentType)

    response.status(dadosGenero.status_code)
    response.json(dadosGenero)
})
