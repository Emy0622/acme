const { filmes } = require("../model/filmes")

// import do arq DAO para manipular dados do banco de dados
const generosDAO = require('../model/DAO/genero')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

const getListarGeneros = async function() {

    try {

        // chama a função do dao para retornar dados no bd
        let dadosGeneros = await generosDAO.selectAllGeneros()

        let generosJSON = {}

        // verifica se existem dados
        if (dadosGeneros) {

            if (dadosGeneros.length > 0) {
                // montando o json para retornar para o app
                generosJSON.generos = dadosGeneros
                generosJSON.quantidade = dadosGeneros.length
                generosJSON.status_code = 200
                return generosJSON
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

const getBuscarGenero = async function(id) {

    // recebe o id do filme
    let idGenero = id
    let generoJSON = {}

    // validação para id vazio, indefinido ou nao numerico
    if (idGenero == '' || idGenero == undefined || isNaN(idGenero)) {
        return message.ERROR_INVALID_ID
    } else {

        // chama a função do dao para retornar dados no bd
        let dadosGenerosPorID = await generosDAO.selectByIdGenero(idGenero)

        // verifica se dados no servidor de banco foram processados
        if (dadosGenerosPorID) {

            // validaão para veificar se existem dados a serem processados
            if (dadosGenerosPorID.length > 0) {
                // montando o json para retornar para o app
                generoJSON.generos = dadosGenerosPorID
                generoJSON.status_code = 200
                return generoJSON //200
            } else {
                return message.ERROR_NOT_FOUND //400
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }

}

const setExcluirGenero = async function(id) {

    // recebe o id do filme
    let idGenero = id
    let generoJSON = {}

    // validação para id vazio, indefinido ou nao numerico
    if (idGenero == '' || idGenero == undefined || isNaN(idGenero)) {
        return message.ERROR_INVALID_ID
    } else {

        // chama a função do dao para retornar dados no bd
        let deletePorID = await generosDAO.deleteGenero(idGenero)

        // verifica se dados no servidor de banco foram processados
        if (deletePorID) {

            // validação para veificar se existem dados a serem processados
            if (deletePorID.length > 0) {
                // montando o json para retornar para o app
                generoJSON.generos = deletePorID
                generoJSON.status_code = 500
                return message.ERROR_INTERNAL_SERVER
            } else {
                return message.REQUEST_SUCCEEDED //400
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }

}

const setInserirNovoGenero = async function(dadosGenero, contentType) {

    try {

        // recebe o tipo de conteudo Content-type da requisição ( a api deve receber dados application/json)
        if (String(contentType).toLowerCase() == 'application/json') {

            // cia a variavel json
            let resultDadosGenero = {}

            // validação de dados
            if (dadosGenero.nome == '' || dadosGenero.nome == undefined || dadosGenero.nome.length > 80) {

                return message.ERROR_REQUIRED_FIELDS
            } else {

                // encaminha dados para o dao inserir no banco de dados
                let novoGenero = await generosDAO.insertGenero(dadosGenero)

                console.log(novoGenero)

                // validação dos dados sendo nseridos pelo dao no banco de dados
                if (novoGenero) {

                    // cria o padrão json ´para o retoro dos dados criados
                    resultDadosGenero.status = message.SUCESS_CREATED_ITEM.status
                    resultDadosGenero.status_code = message.SUCESS_CREATED_ITEM.status_code
                    resultDadosGenero.message = message.SUCESS_CREATED_ITEM.message
                    resultDadosGenero.genero = dadosGenero

                    return resultDadosGenero // 201 
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB // 500 erro na camada do DAO
                }
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}





module.exports = {
    getListarGeneros,
    setInserirNovoGenero,
    setExcluirGenero,
    getBuscarGenero,
}