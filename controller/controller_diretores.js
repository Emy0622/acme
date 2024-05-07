/******************************************************************************************
 * Objetivo: Arquivo responsavel pela interção entre o APP e a model, que teremos todas as tratativas e regra de negocio para o crud de filmes 
 * Autora: Yasmin Targino de Alexandre
 * Data: 30/01/2024
 * Versão: 1.0.1.24
 *****************************************************************************************/


const { filmes } = require("../model/filmes")

// import das funcoes que estão em outro arq
var funcoesParaUso = require('./funcoes.js')

// import do arq DAO para manipular dados do banco de dados
const diretoresDAO = require('../model/DAO/diretor.js')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// funcao para retornar todos os filmes do banco de dados
const getListardiretores = async function() {

    try {

        // chama a função do dao para retornar dados no bd
        let dadosdiretores = await diretoresDAO.selectAlldiretores()

        let diretoresJSON = {}

        // verifica se existem dados
        if (dadosdiretores) {

            if (dadosdiretores.length > 0) {
                // montando o json para retornar para o app
                diretoresJSON.diretores = dadosdiretores
                diretoresJSON.quantidade = dadosdiretores.length
                diretoresJSON.status_code = 200
                return diretoresJSON
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

const setInserirNovodiretor = async function(dadosdiretor, contentType) {

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

                // validação de digitação para a data de relancamento que não é campo obrigdiretorio
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

const setAtualizardiretor = async function() {

}

const setExcluirdiretor = async function(id) {

    // recebe o id do filme
    let idDiretor = id
    let diretorJSON = {}

    // validação para id vazio, indefinido ou nao numerico
    if (idDiretor ==
        '' || idDiretor ==
        undefined || isNaN(idDiretor)) {
        return message.ERROR_INVALID_ID
    } else {

        // chama a função do dao para retornar dados no bd
        let deletePorID = await diretoresDAO.deletediretor(idDiretor)

        // verifica se dados no servidor de banco foram processados
        if (deletePorID) {

            // validação para veificar se existem dados a serem processados
            if (deletePorID.length > 0) {
                // montando o json para retornar para o app
                diretorJSON.filmes = deletePorID
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

const getBuscardiretor = async function(id) {

    // recebe o id do filme
    let idDiretor = id
    let diretorJSON = {}

    // validação para id vazio, indefinido ou nao numerico
    if (idDiretor ==
        '' || idDiretor ==
        undefined || isNaN(idDiretor)) {
        return message.ERROR_INVALID_ID
    } else {

        // chama a função do dao para retornar dados no bd
        let dadosdiretoresPorID = await diretoresDAO.selectByidDiretor(idDiretor)

        // verifica se dados no servidor de banco foram processados
        if (dadosdiretoresPorID) {

            // validaão para veificar se existem dados a serem processados
            if (dadosdiretoresPorID.length > 0) {
                // montando o json para retornar para o app
                diretorJSON.diretores = dadosdiretoresPorID
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
    getListardiretores,
    setAtualizardiretor,
    setInserirNovodiretor,
    setExcluirdiretor,
    getBuscardiretor
}