/******************************************************************************************
 * Objetivo: Fazer as tratativas
 * Autora: Yasmin Targino de Alexandre
 * Data: 30/01/2024
 * Versão: 1.0.1.24
 *****************************************************************************************/

// Importando os dados dos filmes
var dadosFilmes = require('../model/filmes.js');


// Função para obter o último ID do banco de dados
const obterIdDB = () => {
    let scriptSql;

    // Montando o script SQL para selecionar o último ID da tabela de filmes
    scriptSql = `select id from tbl_filme order by id desc limit 1;`

    return scriptSql
}

// Função para obter uma lista simplificada de filmes
const getListaFilmes = () => {
    // Acessando a lista completa de filmes do arquivo de dados
    const filmes = dadosFilmes.filmes.filmes

    // Inicializando variáveis para armazenar os resultados
    let jsonFilmes = {}
    let arrayFilmes = []

    // Iterando sobre cada filme na lista completa
    filmes.forEach((filme) => {
            // Criando um objeto JSON simplificado para cada filme contendo apenas o ID e o nome
            let jsonFilmes = {
                    id: filme.id,
                    nome: filme.nome,
                }
                // Adicionando o filme simplificado ao array de filmes
            arrayFilmes.push(jsonFilmes)
        })
        // Armazenando o array de filmes simplificados no objeto JSON de retorno
    jsonFilmes.filmes = arrayFilmes

    return jsonFilmes // Retornando a lista de filmes simplificada
}

getListaFilmes()

// module.exports = {
//     getListaFilmes,
//     // pegarIdBD
// }