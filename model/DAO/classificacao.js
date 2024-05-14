// import da biblioteca do Prisma Client
const { PrismaClient } = require('@prisma/client')

// istanciando o objeto prisma com as caracterisyicas do prisma client
const prisma = new PrismaClient()

const selectAllClassificacoes = async function(dadosFilme) {

    try {

        // sql script para listar todos os filmes existentes
        let sql = 'SELECT * FROM tbl_classificacao ORDER BY id DESC'

        // $queryRawUnsafe(sql) --- encaminha apenas a variável
        // $queryRaw('SELECT * FROM tbl_filme') --- encaminha o script

        let rsClassificacao = await prisma.$queryRawUnsafe(sql)

        return rsClassificacao

    } catch (error) {
        return false
    }

}

const insertClassificacao = async function(dadosClassificacao) {

    // script sql para inserir no banco de dados
    try {

        let sql = `insert into tbl_classificacao(
            nome,
            descricao
            ) values 
            (
                    '${dadosClassificacao.nome}', 
                    '${dadosClassificacao.descricao}'
            )`

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

const updateClassificacao = async function(dadosFilme) {

}

const deleteClassificacao = async function(id) {

    try {

        // sql script para deletar os filmes por id
        let sql = `DELETE FROM tbl_classificacao WHERE id=${id}`

        // $queryRawUnsafe(sql) --- encaminha apenas a variável
        // $queryRaw('SELECT * FROM tbl_filme') --- encaminha o script

        let rsClassificacao = await prisma.$queryRawUnsafe(sql)

        return rsClassificacao
    } catch (error) {
        return false
    }
}

const selectByIdClassificacao = async function(id) {

    try {

        // sql script para listar os filmes por id
        let sql = `SELECT * FROM tbl_classificacao WHERE id =${id}`

        // $queryRawUnsafe(sql) --- encaminha apenas a variável
        // $queryRaw('SELECT * FROM tbl_filme') --- encaminha o script

        let rsClassificacao = await prisma.$queryRawUnsafe(sql)

        return rsClassificacao
    } catch (error) {
        return false
    }
}

module.exports = {
    selectAllClassificacoes,
    insertClassificacao,
    updateClassificacao,
    deleteClassificacao,
    selectByIdClassificacao
}