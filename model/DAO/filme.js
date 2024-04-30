/******************************************************************************************
// Objetivo: Criar a interação do banco de dados MySql para fazer o CRUD de Filmes
// Data: 30-01-24
// Autor: Yasmin Targino
// Versao: 1.0.1.24
 *****************************************************************************************/

// import das funcoes que estão em outro arq
var funcoesParaUso = require('../../controller/funcoes.js')

// inserir um novo filme

// import da biblioteca do Prisma Client
const { PrismaClient } = require('@prisma/client')

// istanciando o objeto prisma com as caracterisyicas do prisma client
const prisma = new PrismaClient()

const insertFilme = async function(dadosFilme) {

    // script sql para inserir no banco de dados
    try {

        let sql;

        if (dadosFilme.data_relancamento == null) {
            sql = `INSERT INTO tbl_filme (
                nome,
                sinopse,
                data_lancamento,
                data_relancamento,
                duracao,
                foto_capa,
                valor_unitario
                ) values (
                    '${dadosFilme.nome}', 
                    '${dadosFilme.sinopse}',
                    '${dadosFilme.data_lancamento}', 
                     null,                    
                    '${dadosFilme.duracao}', 
                    '${dadosFilme.foto_capa}',
                    '${dadosFilme.valor_unitario}'
            )`;
        } else {

            sql = `INSERT INTO tbl_filme (
        nome,
        sinopse,
        data_lancamento,
        data_relancamento,
        duracao,
        foto_capa,
        valor_unitario
        ) values (
            '${dadosFilme.nome}', 
            '${dadosFilme.sinopse}',
            '${dadosFilme.data_lancamento}', 
            '${dadosFilme.data_relancamento}',
            '${dadosFilme.duracao}', 
            '${dadosFilme.foto_capa}',
            '${dadosFilme.valor_unitario}'
    )`;
        }

        console.log(funcoesParaUso.pegarIdBD())

        // executa o cript sql no banco de dados OBS: DEVEMOS USAR O COMANDO {[( EXECUTE )]} E NÃO O QUERY
        let result = await prisma.$executeRawUnsafe(sql)

        // validação para verificar se o insert funcionou no banco de dados
        if (result)
            return true
        else
            return false


    } catch (error) {
        return false
    }
}

// atualizar um filme filrando por id
const updateFilme = async function(id) {

}

// deletar um filme filtrando por id
const deleteFilme = async function(id) {

    try {

        // sql script para deletar os filmes por id
        let sql = `DELETE FROM tbl_filme WHERE id=${id};`

        // $queryRawUnsafe(sql) --- encaminha apenas a variável
        // $queryRaw('SELECT * FROM tbl_filme') --- encaminha o script

        let rsFilmes = await prisma.$queryRawUnsafe(sql)

        return rsFilmes
    } catch (error) {
        return false
    }
}

// listar todos os filmes existentes na tabela
const selectAllFilmes = async function() {

    try {

        // sql script para listar todos os filmes existentes
        let sql = 'SELECT * FROM tbl_filme ORDER BY id DESC'


        // $queryRawUnsafe(sql) --- encaminha apenas a variável
        // $queryRaw('SELECT * FROM tbl_filme') --- encaminha o script

        let rsFilmes = await prisma.$queryRawUnsafe(sql)

        // tratamento de dados para retornar dados ou false
        if (rsFilmes.length > 0)
            return rsFilmes
        else
            return false
    } catch (error) {
        return false
    }


}

// listar um filme por id
const selectByIdFilme = async function(id) {

    try {

        // sql script para listar os filmes por id
        let sql = `SELECT * FROM tbl_filme WHERE id =${id}`

        // $queryRawUnsafe(sql) --- encaminha apenas a variável
        // $queryRaw('SELECT * FROM tbl_filme') --- encaminha o script

        let rsFilmes = await prisma.$queryRawUnsafe(sql)

        return rsFilmes
    } catch (error) {
        return false
    }
}

module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme
}