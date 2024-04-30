/******************************************************************************************
 * Objetivo: Arquivo responsavel pela interção entre o APP e a model, que teremos todas as tratativas e regra de negocio para o crud de filmes 
 * Autora: Yasmin Targino de Alexandre
 * Data: 30/01/2024
 * Versão: 1.0.1.24
 *****************************************************************************************/

const { filmes } = require("../model/filmes")

// import do arq DAO para manipular dados do banco de dados
const filmesDAO = require('../model/DAO/filme.js')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// Função para colocar um novo filme no banco de dados
const setInserirNovoFilme = async function(dadosFilme, contentType) {

    try {

        //vendo se o tipo de coisa é JSON
        if (String(contentType).toLowerCase() == 'application/json') {

            // começpando um objeto para armazenar os resultados
            let resultDadosFilme = {}

            //validando os dados do filme
            if (dadosFilme.nome == '' || dadosFilme.nome == undefined || dadosFilme.nome.length > 80 ||
                dadosFilme.sinopse == '' || dadosFilme.sinopse == undefined || dadosFilme.sinopse.length > 65000 ||
                dadosFilme.duracao == '' || dadosFilme.duracao == undefined || dadosFilme.duracao.length > 8 ||
                dadosFilme.data_lancamento == '' || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento.length > 10 ||
                dadosFilme.data_relancamento != undefined && dadosFilme.data_relancamento.length > 10 ||
                dadosFilme.foto_capa == '' || dadosFilme.foto_capa == undefined || dadosFilme.foto_capa.length > 200 ||
                dadosFilme.valor_unitario.length > 8
            ) {
                // traz uma mensagem de erro se os dados não estiverem certos
                return message.ERROR_REQUIRED_FIELDS; // 400 - Campos obrigatórios/incorretos

            } else {
                // validando os dadis e chamando o DAO pra colocar os dados no banco
                let dadosValidated = false;

                // verificação para data de relançamento que não é campo obrigatório
                if (dadosFilme.data_relancamento != undefined && dadosFilme.data_relancamento.length == 10) {
                    dadosValidated = true;
                } else {
                    dadosValidated = true; // caso a data nao exista nos dados
                }

                if (dadosValidated) {
                    let novofilme = await filmesDAO.insertFilme(dadosFilme);

                    // vwendo se os dados foram colocados da maneira certa no banco
                    if (novofilme) {
                        // Preparando o JSON de retorno
                        resultDadosFilme.status = message.SUCESS_CREATED_ITEM.status;
                        resultDadosFilme.status_code = message.SUCESS_CREATED_ITEM.status_code;
                        resultDadosFilme.message = message.SUCESS_CREATED_ITEM.message;
                        resultDadosFilme.filme = dadosFilme;

                        return resultDadosFilme; //201 - Sucesso
                    } else {
                        return message.ERROR_TERMINAL_SERVER_DB //500 - Erro na camada do DAO
                    }
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE // Tipo de conteúdo inválido
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER // Erro interno do servidor
    }
}

// função pra atualizar um filme no banco de dados
const setAtualizarFilme = async function() {
    // dinda não implementada
}

// função pra excluir um filme do banco de dados
const setExcluirFilme = async function(id) {
    // recebe o ID do filme
    let idFilme = id
    let filmeJSON = {}

    // validando o ID
    if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
        return message.ERROR_INVALID_ID // ID inválido
    } else {
        // chamando a função do DAO pra excluir o filme
        let deleteFilmePorId = await filmesDAO.deleteFilme(idFilme)

        // vendo se a exclusão foi processada do jeitinho certo
        if (deleteFilmePorId) {
            // vendo se tem dados a serem processados
            if (deleteFilmePorId.length > 0) {
                // montando o JSON de retorno
                filmeJSON.filmes = deleteFilmePorId
                filmeJSON.status_code = 404
                return ERROR_NOT_FOUND //404 - Não encontrado
            } else {
                return message.ERROR_NOT_FOUND //404 - Não encontrado
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500 - Erro interno do servidor de banco de dados
        }
    }
}

// função para retornar tdos os filmes do banco de dados
const getListarFilmes = async function() {
    // incicializando um objeto JSON
    let filmesJSON = {};

    // chamando a função do DAO pra buscar os filmes
    let dadosFilmes = await filmesDAO.selectAllFilmes();

    if (dadosFilmes) {
        // preparando o JSON de retorno com os filmes
        filmesJSON.filmes = dadosFilmes;
        filmesJSON.quantidade = dadosFilmes.length;
        filmesJSON.status_code = 200
        return filmesJSON; //200 - Sucesso
    } else {
        return false; // retorno vazio
    }
}

// função pra buscar um filme do banco de dados pelo ID
const getBuscarFilme = async function(id) {
    // Recebe o ID do filme
    let idFilme = id
    let filmeJSON = {}

    // Validando o ID
    if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
        return message.ERROR_INVALID_ID // ID inválido
    } else {
        // Chamando a função do DAO para buscar o filme pelo ID
        let dadosFilmesPorID = await filmesDAO.selectByIdFilme(idFilme)

        // Vendo se a busca foi processada da forma certa
        if (dadosFilmesPorID) {
            // vendo se há dados a serem processados
            if (dadosFilmesPorID.length > 0) {
                // Montando o JSON de retorno com os dados do filme
                filmeJSON.filmes = dadosFilmesPorID
                filmeJSON.status_code = 200
                return filmeJSON //200: Sucesso
            } else {
                return message.ERROR_NOT_FOUND //404: Não encontrado
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500: Erro interno do servidor de banco de dados
        }
    }
}

// Exportando as funções para usar em outros arquivoos :)
module.exports = {
    setAtualizarFilme,
    setInserirNovoFilme,
    setExcluirFilme,
    getBuscarFilme,
    getListarFilmes
}