/******************************************************************************************
 * Objetivo: Fazer as tratativas
 * Autora: Yasmin Targino de Alexandre
 * Data: 30/01/2024
 * Versão: 1.0.1.24
 *****************************************************************************************/

var dadosFilmes = require('../model/filmes.js')

const obterIdDB = () => {
    let scriptSql;

    scriptSql = `select id from tbl_filme order by id desc limit 1;`

    return scriptSql
}

const getListaFilmes = () => {
    const filmes = dadosFilmes.filmes.filmes

    let jsonFilmes = {}
    let arrayFilmes = []

    filmes.forEach((filme) => {
        let jsonFilmes = {
            id: filme.id,
            nome: filme.nome,
        }

        arrayFilmes.push(jsonFilmes)
    })

    jsonFilmes.filmes = arrayFilmes

    return jsonFilmes

}

getListaFilmes()

console.log(getListaFilmes())

module.exports = {
    getListaFilmes
}