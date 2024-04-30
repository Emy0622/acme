// objetivo: Arquivo responsavel pela interação entre o APP e o Model, que teremos todas as tratativas e regra de negocio para o crud de ATORES
// data: 2024-04-16
// autora: Yasmin Targino de Alexandre
// versao: 1.0.4.24
//________________________________________________________________________________________________________________________________________________________________________

const { filmes } = require("../modulo/filmes.js")

// import das funcoes que estão em outro arq
var funcoesParaUso = require('./funcoes.js').default

// import do arq DAO para manipular dados do banco de dados
const atoresDAO = require('../model/DAO/ator.js')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// funcao para retornar todos os filmes do banco de dados
const getListarAtores = async function() {

    try {

        // chama a função do dao para retornar dados no bd
        let dadosAtores = await atoresDAO.selectAllAtores()

        let atoresJSON = {}

        // verifica se existem dados
        if (dadosAtores) {

            if (dadosAtores.length > 0) {
                // montando o json para retornar para o app
                atoresJSON.atores = dadosAtores
                atoresJSON.quantidade = dadosAtores.length
                atoresJSON.status_code = 200
                return atoresJSON
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const setInserirNovoAtor = async function(dadosAtor, contentType) {

    try {


        // recebe o tipo de conteudo Content-type da requisição ( a api deve receber dados application/json)
        if (String(contentType).toLowerCase() == 'application/json') {

            // cia a variavel json
            let resultDadosFilme = {}

            // validação de dados
            if (dadosFilme.nome == '' || dadosFilme.nome == undefined || dadosFilme.nome.length > 80 ||
                dadosFilme.sinopse == '' || dadosFilme.sinopse == undefined || dadosFilme.sinopse.length > 65000 ||
                dadosFilme.duracao == '' || dadosFilme.duracao == undefined || dadosFilme.duracao.length > 10 ||
                dadosFilme.data_lancamento == '' || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento.length > 10 ||
                dadosFilme.foto_capa == '' || dadosFilme.foto_capa == undefined || dadosFilme.foto_capa.length > 200 ||
                dadosFilme.valor_unitario.length > 8) {

                return message.ERROR_REQUIRED_FIELDS
            } else {

                // variavel para validar se poderemos chamar o dao para inserirf os dados 
                let dadosValidated = false

                // validação de digitação para a data de relancamento que não é campo obrigatorio
                if (dadosFilme.data_relancamento != null && dadosFilme.data_relancamento != undefined && dadosFilme.data_relancamento != "") {
                    if (dadosFilme.data_relancamento.length != 10) {
                        return message.ERROR_REQUIRED_FIELDS; // 400 - campos preenchidos incorretamente
                    } else {
                        dadosValidated = true // se a data estiver com exatamnete 10 char
                    }
                } else {
                    dadosValidated = true // se a data não existir nos dados
                }

                // validação para verificar se podemos encarregar os dados para o dao
                if (dadosValidated) {

                    // encaminha dados para o dao inserir no banco de dados
                    let novoFilme = await filmesDAO.insertFilme(dadosFilme)

                    // validação dos dados sendo nseridos pelo dao no banco de dados
                    if (novoFilme) {

                        // cria o padrão json ´para o retoro dos dados criados
                        resultDadosFilme.status = message.SUCESS_CREATED_ITEM.status
                        resultDadosFilme.status_code = message.SUCESS_CREATED_ITEM.status_code
                        resultDadosFilme.message = message.SUCESS_CREATED_ITEM.message
                        resultDadosFilme.filme = dadosFilme

                        return resultDadosFilme // 201 
                    } else {
                        return message.ERROR_INTERNAL_SERVER_DB // 500 erro na camada do DAO
                    }
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const setAtualizarAtor = async function() {

}

const setExcluirAtor = async function(id) {

    // recebe o id do filme
    let idAtor = id
    let atorJSON = {}

    // validação para id vazio, indefinido ou nao numerico
    if (idAtor == '' || idAtor == undefined || isNaN(idAtor)) {
        return message.ERROR_INVALID_ID
    } else {

        // chama a função do dao para retornar dados no bd
        let deletePorID = await atoresDAO.deleteAtor(idAtor)

        // verifica se dados no servidor de banco foram processados
        if (deletePorID) {

            // validação para veificar se existem dados a serem processados
            if (deletePorID.length > 0) {
                // montando o json para retornar para o app
                atorJSON.filmes = deletePorID
                atorJSON.status_code = 500
                return message.ERROR_INTERNAL_SERVER
            } else {
                return message.REQUEST_SUCCEEDED //400
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }

}

const getBuscarAtor = async function(id) {

    // recebe o id do filme
    let idAtor = id
    let atorJSON = {}

    // validação para id vazio, indefinido ou nao numerico
    if (idAtor == '' || idAtor == undefined || isNaN(idAtor)) {
        return message.ERROR_INVALID_ID
    } else {

        // chama a função do dao para retornar dados no bd
        let dadosAtoresPorID = await atoresDAO.selectByIdAtor(idAtor)

        // verifica se dados no servidor de banco foram processados
        if (dadosAtoresPorID) {

            // validaão para veificar se existem dados a serem processados
            if (dadosAtoresPorID.length > 0) {
                // montando o json para retornar para o app
                atorJSON.atores = dadosAtoresPorID
                atorJSON.status_code = 200
                return atorJSON //200
            } else {
                return message.ERROR_NOT_FOUND //400
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }

}

module.exports = {
    getListarAtores,

    setAtualizarAtor,
    setInserirNovoAtor,
    setExcluirAtor,
    getBuscarAtor
}



// // Aqui importamos o modelo de filmes.
// const { filmes } = require("../model/filmes")

// // Importamos algumas funções de outro arquivo.
// var funcoesParaUso = require('./funcoes.js')

// // Importamos o DAO de atores para manipular dados do banco de dados.
// const atoresDAO = require('../model/DAO/ator.js')

// // Importamos o arquivo de configuração do projeto.
// const message = require('../modulo/config.js')

// // Esta função retorna uma lista de todos os atores do banco de dados.
// const getListarAtores = async function() {
//     // Tenta obter dados de todos os atores do banco de dados.
//     try {
//         let dadosAtores = await atoresDAO.selectAllAtores()

//         let atoresJSON = {}

//         // Verifica se existem dados de atores.
//         if (dadosAtores) {
//             // Se houver dados, montamos um JSON para retornar.
//             if (dadosAtores.length > 0) {
//                 atoresJSON.atores = dadosAtores
//                 atoresJSON.quantidade = dadosAtores.length
//                 atoresJSON.status_code = 200
//                 return atoresJSON
//             } else {
//                 // Se não houver dados, retornamos uma mensagem de erro.
//                 return message.ERROR_NOT_FOUND
//             }
//         } else {
//             // Se houver um erro interno no servidor de banco de dados, retornamos uma mensagem de erro.
//             return message.ERROR_INTERNAL_SERVER_DB
//         }
//     } catch (error) {
//         // Se houver um erro interno no servidor, retornamos uma mensagem de erro.
//         return message.ERROR_INTERNAL_SERVER
//     }
// }

// // Esta função insere um novo ator no banco de dados.
// const setInserirNovoAtor = async function(dadosAtor, contentType) {
//     // ...
// }

// // Esta função atualiza um ator no banco de dados.
// const setAtualizarAtor = async function() {
//     // ...
// }

// // Esta função exclui um ator do banco de dados.
// const setExcluirAtor = async function(id) {
//     // ...
// }

// // Esta função busca um ator pelo seu ID no banco de dados.
// const getBuscarAtor = async function(id) {
//     // ...
// }

// // Exportamos todas as funções para uso externo.
// module.exports = {
//     getListarAtores,
//     setAtualizarAtor,
//     setInserirNovoAtor,
//     setExcluirAtor,
//     getBuscarAtor
// }