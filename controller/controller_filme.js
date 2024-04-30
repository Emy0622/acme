/******************************************************************************************
 * Objetivo: Arquivo responsavel pela interção entre o APP e a model, que teremos todas as tratativas e regra de negocio para o crud de filmes 
 * Autora: Yasmin Targino de Alexandre
 * Data: 30/01/2024
 * Versão: 1.0.1.24
 *****************************************************************************************/

//import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

const { filmes } = require("../model/filmes.js")

// import do arquivo DAO para manipular dados do banco de dados
const filmesDAO = require('../model/DAO/filme.js')

// função para inserir um novo filme do banco de dados

const setInserirNovoFilme = async function(dadosFilme, contentType) {

    try {

        if (String(contentType).toLowerCase() == 'application/json') {


            let resultDadosFilme = {}

            console.log(dadosFilme)
            if (dadosFilme.nome == '' || dadosFilme.nome == underfined || dadosFilme.nome.length > 80 ||
                dadosFilme.sinopse == '' || dadosFilme.sinopse == undefined || dadosFilme.sinopse.length > 65000 ||
                dadosFilme.duracao == '' || dadosFilme.duracao == undefined || dadosFilme.duracao.length > 8 ||
                dadosFilme.data_lancamento == '' || dadosFilme.data_lancamento == undefined || dadosFilme.sinopse.data_lancamento > 10 ||
                dadosFilme.data_relancamento > 10 ||
                dadosFilme.foto_capa == '' || dadosFilme.foto_capa == undefined || dadosFilme.foto_capa.length > 200 ||
                dadosFilme.valor_unitario.length > 8

            ) {
                //mensagem de erro
                return message.ERROR_REQUIRED_FIELDS; // 400 campos obrigatorios/incorretos

            } else {
                //Validação para chamar o DAO para inserir os dados
                let dadosValidated = false;

                //Verificação para data de relançamento que não é campo obrigatório
                //Variavel pra validar se iremos poder chamar o DAO para inserir os dados

                if (dadosFilme.data_lancamento != undefined && null && "") {
                    if (dadosFilme.data_relancamento.length != 10) {
                        return message.ERROR_REQUIRED_FIELDS; //400 campos obrigatórios 
                    } else {

                        dadosValidated = true // se a data tiver exatamente 10 carac
                    }

                } else {

                    dadosValidated = true // se a data não existir nos dados
                }

                if (dadosValidated) {

                    let novofilme = await filmesDAO.insertFilme(dadosFilme);


                    //validação para verificar se os dados foram inseridos pelo DAO no BD
                    if (novofilme) {

                        //Cria o padrão JSON para retorno dos dados criados no BD
                        resultDadosFilme.status = message.SUCESS_CREATED_ITEM.status;
                        resultDadosFilme.status_code = message.SUCESS_CREATED_ITEM.status_code;
                        resultDadosFilme.message = message.SUCESS_CREATED_ITEM.message;
                        resultDadosFilme.filme = dadosFilme;

                        return resultDadosFilme; //201

                    } else {
                        return message.ERROR_TERMINAL_SERVER_DB //500 erro na camada do DAO
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

// funcao para atualizar um filme do BD
const setAtualizarFilme = async function() {

}

// funcao para excluir um filme do BD
const setExcluirFilme = async function(id) {

    // recebe o id do filme
    let idFilme = id
    let filmeJSON = {}

    // validação para id vazio, indefinido ou nao numerico
    if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
        return message.ERROR_INVALID_ID
    } else {

        // chama a função do dao para retornar dados no bd
        let deleteFilmePorId = await filmesDAO.deleteFilme(idFilme)

        // ve se os dados no servidor de banco foram processados
        if (deleteFilmePorId) {

            // validaCão para verificar se existem dados a serem processados
            if (deleteFilmePorId.length > 0) {
                // montando o json para retornar para o app
                filmeJSON.filmes = deleteFilmePorId
                filmeJSON.status_code = 404
                return ERROR_NOT_FOUND
            } else {
                return message.ERROR_NOT_FOUND //400
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }
}

// funcao para retornar todos os filmes do banco de dados
const getListarFilmes = async function() {

    //criar uma variavel do tipo json
    let filmesJSON = {};

    //chama a função do DAO para buscar
    let dadosFilmes = await filmesDAO.selectAllFilmes();

    if (dadosFilmes) {
        filmesJSON.filmes = dadosFilmes;
        filmesJSON.quantidade = dadosFilmes.length;
        filmesJSON.status_code = 200
        return filmesJSON;

    } else {
        return false;
    }


}

// funcao para buscar um filme do BD pelo id
const getBuscarFilme = async function(id) {

    // recebe o id do filme
    let idFilme = id
    let filmeJSON = {}

    // validação para id vazio, indefinido ou nao numerico
    if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
        return message.ERROR_INVALID_ID
    } else {

        // chama a função do dao para retornar dados no bd
        let dadosFilmesPorID = await filmesDAO.selectByIdFilme(idFilme)

        // verifica se dados no servidor de banco foram processados
        if (dadosFilmesPorID) {

            // validaão para veificar se existem dados a serem processados
            if (dadosFilmesPorID.length > 0) {
                // montando o json para retornar para o app
                filmeJSON.filmes = dadosFilmesPorID
                filmeJSON.status_code = 200
                return filmeJSON //200
            } else {
                return message.ERROR_NOT_FOUND //400
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }
}
module.exports = {
    setAtualizarFilme,
    setInserirNovoFilme,
    setExcluirFilme,
    getBuscarFilme,
    getListarFilmes
}