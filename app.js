/************************************************************************************************************************************************                                                           *
 * Autora: Yasmin Targino de Alexandre                                                                                                          *
 * Data: 30/01/2024                                                                                                                             *
 * Versão: 1.0.1.24                                                                                                                             *
 ************************************************************************************************************************************************/

// Para fazer as integracoes com o banco de dados, precisamos ultilizar uma dependencia
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
const controllerFilmes = require('./controller/controller_filme.js')
const controllerAtores = require('./controller/controller_ator.js')
const controllerDiretores = require('./controller/controller_diretores.js')
const controller_genero = require('./controller/controller_genero.js')
const controllerClassificacao = require('./controller/controller_classificacao.js')
const config = require('../backend_acme/modulo/config.js')



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

// ------------------------------------------------------------------------------------------------

// FILMES

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

app.delete('/v3/acme/filme/delete/:id', cors(), async function(request, response, next) {

    // RECEBE A RRQUISIÇÃO DO ID
    let idFilme = request.params.id

    let deletarFilmesPorID = await controllerFilmes.setExcluirFilme(idFilme);
    response.status(deletarFilmesPorID.status_code)
    response.json(deletarFilmesPorID)
})

// ------------------------------------------------------------------------------------------------

// ATORES


app.get('/v2/acme/atores', cors(), async function(request, response, next) {

    let dadosAtores = await controllerAtores.getListarAtores();
    response.status(dadosAtores.status_code)
    response.json(dadosAtores)
})

app.get('/v2/acme/ator/:id', cors(), async function(request, response, next) {

    // RECEBE A RRQUISIÇÃO DO ID
    let idAtor = request.params.id

    let dadosAtoresPorID = await controllerAtores.getBuscarAtor(idAtor);
    response.status(dadosAtoresPorID.status_code)
    response.json(dadosAtoresPorID)
})

app.delete('/v3/acme/ator/delete/:id', cors(), async function(request, response, next) {

    // RECEBE A RRQUISIÇÃO DO ID
    let idAtor = request.params.id

    let deletarAtoresPorID = await controllerAtores.setExcluirAtor(idAtor);
    response.status(deletarAtoresPorID.status_code)
    response.json(deletarAtoresPorID)
})

app.post('/v2/acmefilmes/ator/', cors(), bodyParserJSON, async function(request, response, next) {

    // 
    let contentType = request.headers['content-type']

    console.log(contentType)

    // recebe os dados encaminhados na requisição do body (json)
    let dadosBody = request.body

    let resultDados = await controllerAtores.setInserirNovoAtor(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)

})

// ------------------------------------------------------------------------------------------------


// DIRETORES


app.get('/v2/acme/diretores', cors(), async function(request, response, next) {

    let dadosDiretores = await controllerDiretores.getListarDiretor();
    response.status(dadosDiretores.status_code)
    response.json(dadosDiretores)
})

app.get('/v2/acme/diretores/:id', cors(), async function(request, response, next) {

    // RECEBE A RRQUISIÇÃO DO ID
    let idDiretor = request.params.id

    let dadosDiretoresPorID = await controllerDiretores.getBuscarDiretor(idDiretor);
    response.status(dadosDiretoresPorID.status_code)
    response.json(dadosDiretoresPorID)
})

app.delete('/v3/acme/diretores/delete/:id', cors(), async function(request, response, next) {

    // RECEBE A RRQUISIÇÃO DO ID
    let idDiretor = request.params.id

    let deletarDiretoresPorID = await controllerDiretores.setExcluirDiretor(idDiretor);
    response.status(deletarDiretoresPorID.status_code)
    response.json(deletarDiretoresPorID)
})

app.post('/v2/acmefilmes/diretores/', cors(), bodyParserJSON, async function(request, response, next) {

    // 
    let contentType = request.headers['content-type']

    console.log(contentType)

    // recebe os dados encaminhados na requisição do body (json)
    let dadosBody = request.body

    let resultDados = await controllerDiretores.setInserirNovoDiretor(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)

})

// ------------------------------------------------------------------------------------------------
// GENEROS
// ------------------------------------------------------------------------------------------------

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

app.delete('/v3/acme/genero/delete/:id', cors(), async function(request, response, next) {

    // RECEBE A RRQUISIÇÃO DO ID
    let idGenero = request.params.id

    let deletarGenerosPorID = await controller_genero.setExcluirGenero(idGenero);
    response.status(deletarGenerosPorID.status_code)
    response.json(deletarGenerosPorID)
})

app.post('/v2/acmefilmes/genero/', cors(), bodyParserJSON, async function(request, response, next) {

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
// ------------------------------------------------------------------------------------------------

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

// ------------------------------------------------------------------------------------------------
// NACIONALIDADE
// ------------------------------------------------------------------------------------------------
app.get('/v2/acme/nacionalidade', cors(), async function(request, response, next) {

    let dadosNacionalidade = await controllerClassificacao.getListarClassificacoes();
    response.status(dadosNacionalidade.status_code)
    response.json(dadosNacionalidade)
})

app.get('/v2/acme/classificacao/:id', cors(), async function(request, response, next) {

    // recebe a requisição do id
    let idNacionalidade = request.params.id

    let dadosNacionalidadeporID = await controllerClassificacao.getBuscarClassificacao(idNacionalidade);
    response.status(dadosNacionalidadeporID.status_code)
    response.json(dadosNacionalidadeporID)
})