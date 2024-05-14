// import das funcoes que estão em outro arq
var funcoesParaUso = require('../../controller/funcoes.js')

// inserir um novo filme

// import da biblioteca do Prisma Client
const { PrismaClient } = require('@prisma/client')

// istanciando o objeto prisma com as caracterisyicas do prisma client
const prisma = new PrismaClient()

const selectAllGeneros = async function(id) {

    try {

        // sql script para listar todos os filmes existentes
        let sql = 'SELECT * FROM tbl_genero ORDER BY id DESC'


        // $queryRawUnsafe(sql) --- encaminha apenas a variável
        // $queryRaw('SELECT * FROM tbl_filme') --- encaminha o script

        let rsGeneros = await prisma.$queryRawUnsafe(sql)

        // tratamento de dados para retornar dados ou false
        if (rsGeneros.length > 0)
            return rsGeneros
        else
            return false
    } catch (error) {
        return false
    }


}

const selectByIdGenero = async function(id) {

    try {

        // sql script para listar os filmes por id
        let sql = `SELECT * FROM tbl_genero WHERE id =${id}`

        // $queryRawUnsafe(sql) --- encaminha apenas a variável
        // $queryRaw('SELECT * FROM tbl_filme') --- encaminha o script

        let rsGenero = await prisma.$queryRawUnsafe(sql)

        return rsGenero
    } catch (error) {
        return false
    }

}

const deleteGenero = async function(id) {

    try {

        // sql script para deletar os filmes por id
        let sql = `DELETE FROM tbl_genero WHERE id=${id};`

        // $queryRawUnsafe(sql) --- encaminha apenas a variável
        // $queryRaw('SELECT * FROM tbl_filme') --- encaminha o script

        let rsGeneros = await prisma.$queryRawUnsafe(sql)

        return rsGeneros
    } catch (error) {
        return false
    }
}

const insertGenero = async function(dadosGenero) {

    // script sql para inserir no banco de dados
    try {

        let sql = `INSERT INTO tbl_genero (nome) values ('${dadosGenero.nome}')`

        //console.log(funcoesParaUso.pegarIdBD())

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

const updateGenero = async function(id) {

}

module.exports = {
    insertGenero,
    updateGenero,
    deleteGenero,
    selectAllGeneros,
    selectByIdGenero
}