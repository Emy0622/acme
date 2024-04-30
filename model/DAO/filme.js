// import das funcoes que estão em outro arq
var funcoesParaUso = require('../../controller/funcoes.js')

// inserir um novo filme

// import da biblioteca do Prisma Client
const { PrismaClient } = require('@prisma/client')

// istanciando o objeto prisma com as caracterisyicas do prisma client
const prisma = new PrismaClient()


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
    selectAllFilmes,
    selectByIdFilme
}