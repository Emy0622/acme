/************************************************************************************************************************************************
 *                                                                                                                                                *
 * Objetivo: Arquivo responsavel pela interação entre o APP e o Model, que teremos todas as tratativas e regra de negocio para o crud de DIRETORES*
 * Autora: Yasmin Targino de Alexandre                                                                                                            *
 * Data: 30/01/2024                                                                                                                               *
 * Versão: 1.0.1.24                                                                                                                               *
 ************************************************************************************************************************************************/

const { filmes } = require("../model/filmes.js")

// import das funcoes que estão em outro arq
var funcoesParaUso = require('./funcoes.js')

// import do arq DAO para manipular dados do banco de dados
const diretoresDAO = require('../model/DAO/diretor.js')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// funcao para retornar todos os filmes do banco de dados
const getListarDiretor = async function() {

    try {

        // chama a função do dao para retornar dados no bd
        let dadosDiretores = await diretoresDAO.selectAllDiretores()

        let diretorJSON = {}

        // verifica se existem dados
        if (dadosDiretores) {

            if (dadosDiretores.length > 0) {
                // montando o json para retornar para o app
                diretorJSON.diretores = dadosDiretores
                diretorJSON.quantidade = dadosDiretores.length
                diretorJSON.status_code = 200
                return diretorJSON
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

const setInserirNovoDiretor = async function(dadosDiretor, contentType) {

    try {


        // recebe o tipo de conteudo Content-type da requisição ( a api deve receber dados application/json)
        if (String(contentType).toLowerCase() == 'application/json') {

            // cia a variavel json
            let resultDadosDiretor = {}

            // validação de dados
            if (dadosDiretor.nome == '' || dadosDiretor.nome == undefined || dadosDiretor.nome.length > 80 ||
                dadosDiretor.data_nascimento == '' || dadosDiretor.data_nascimento == undefined || dadosDiretor.data_nascimento.length > 10) {
                return message.ERROR_REQUIRED_FIELDS
            } else {

                // variavel para validar se poderemos chamar o dao para inserirf os dados 
                let dadosValidated = false

                // validação de digitação para a data de relancamento que não é campo obrigatorio
                if (dadosDiretor.nome_artistico != null && dadosDiretor.nome_artistico != undefined && dadosDiretor.nome_artistico != "") {
                    if (dadosDiretor.nome_artistico.length > 100) {
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
                    let novoDiretor = await diretoresDAO.insertDiretor(dadosDiretor)

                    // validação dos dados sendo nseridos pelo dao no banco de dados
                    if (novoDiretor) {

                        // cria o padrão json ´para o retoro dos dados criados
                        resultDadosDiretor.status = message.SUCESS_CREATED_ITEM.status
                        resultDadosDiretor.status_code = message.SUCESS_CREATED_ITEM.status_code
                        resultDadosDiretor.message = message.SUCESS_CREATED_ITEM.message
                        resultDadosDiretor.filme = dadosDiretor

                        return resultDadosDiretor // 201 
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

const setAtualizarDiretor = async function() {

}

const setExcluirDiretor = async function(id) {

    // recebe o id do filme
    let idDiretor = id
    let diretorJSON = {}

    // validação para id vazio, indefinido ou nao numerico
    if (idDiretor == '' || idDiretor == undefined || isNaN(idDiretor)) {
        return message.ERROR_INVALID_ID
    } else {

        // chama a função do dao para retornar dados no bd
        let deletePorID = await diretoresDAO.deleteDiretor(idDiretor)

        // verifica se dados no servidor de banco foram processados
        if (deletePorID) {

            // validação para veificar se existem dados a serem processados
            if (deletePorID.length > 0) {
                // montando o json para retornar para o app
                diretorJSON.diretores = deletePorID
                diretorJSON.status_code = 500
                return message.ERROR_INTERNAL_SERVER
            } else {
                return message.REQUEST_SUCCEEDED //400
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }

}

const getBuscarDiretor = async function(id) {

    // recebe o id do filme
    let idDiretor = id
    let diretorJSON = {}

    // validação para id vazio, indefinido ou nao numerico
    if (idDiretor == '' || idDiretor == undefined || isNaN(idDiretor)) {
        return message.ERROR_INVALID_ID
    } else {

        // chama a função do dao para retornar dados no bd
        let dadosDiretoresPorID = await diretoresDAO.selectByIdDiretor(idDiretor)

        // verifica se dados no servidor de banco foram processados
        if (dadosDiretoresPorID) {

            // validaão para veificar se existem dados a serem processados
            if (dadosDiretoresPorID.length > 0) {
                // montando o json para retornar para o app
                diretorJSON.diretores = dadosDiretoresPorID
                diretorJSON.status_code = 200
                return diretorJSON //200
            } else {
                return message.ERROR_NOT_FOUND //400
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }

}

module.exports = {
    getListarDiretor,
    setAtualizarDiretor,
    setInserirNovoDiretor,
    setExcluirDiretor,
    getBuscarDiretor
}