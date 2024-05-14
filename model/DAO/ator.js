/************************************************************************************************************************************************
 *                                                                                                                                              *
 * Objetivo: Criar a interação do banco de dados MySql para fazer o CRUD de ATORES                                                              *
 * Autora: Yasmin Targino de Alexandre                                                                                                          *
 * Data: 30/01/2024                                                                                                                             *
 * Versão: 1.0.1.24                                                                                                                             *
 ************************************************************************************************************************************************/

// import da biblioteca do Prisma Client
const { PrismaClient } = require('@prisma/client')

// istanciando o objeto prisma com as caracterisyicas do prisma client
const prisma = new PrismaClient()

// listar todos os filmes existentes na tabela
const selectAllAtores = async function() {

    try {

        // sql script para listar todos os filmes existentes
        let sql = 'SELECT * FROM tbl_ator ORDER BY id DESC'

        // $queryRawUnsafe(sql) --- encaminha apenas a variável
        // $queryRaw('SELECT * FROM tbl_filme') --- encaminha o script

        let rsAtores = await prisma.$queryRawUnsafe(sql)

        return rsAtores

    } catch (error) {
        return false
    }
}

const insertAtor = async function(dadosAtor) {
    // script sql para inserir no banco de dados
    try {
        let sql;

        if (dadosAtor.nome_artistico == null) {
            sql = `INSERT INTO tbl_ator (
                    nome,
                    nome_artistico,
                    data_nascimento
                    ) values (
                        '${dadosAtor.nome}', 
                         null,                
                         '${dadosAtor.data_nascimento}'
                         )`;
        } else {
            sql = `INSERT INTO tbl_ator (
                    nome,
                    nome_artistico,
                    data_nascimento
            ) values (
                '${dadosAtor.nome}',
                        '${dadosAtor.nome_artistico}',
                        '${dadosAtor.data_nascimento}'
        )`;
        }

        // console.log(funcoesParaUso.pegarIdBD())

        // executa o cript sql no banco de dados OBS: DEVEMOS USAR O COMANDO {[( EXECUTE )]} E NÃO O QUERY
        let result = await prisma.$executeRawUnsafe(sql);

        // validação para verificar se o insert funcionou no banco de dados
        if (result) return true;
        else return false;
    } catch (error) {
        console.log(error);
        return false;
    }
};

const updateAtor = async function(id) {

}

const deleteAtor = async function(id) {

    try {

        // sql script para deletar os filmes por id
        let sql = `DELETE FROM tbl_ator WHERE id=${id};`

        // $queryRawUnsafe(sql) --- encaminha apenas a variável
        // $queryRaw('SELECT * FROM tbl_filme') --- encaminha o script

        let rsAtores = await prisma.$queryRawUnsafe(sql)

        return rsAtores
    } catch (error) {
        return false
    }
}

const selectByIdAtor = async function(id) {

    try {

        // sql script para listar os filmes por id
        let sql = `SELECT * FROM tbl_ator WHERE id =${id}`

        // $queryRawUnsafe(sql) --- encaminha apenas a variável
        // $queryRaw('SELECT * FROM tbl_filme') --- encaminha o script

        let rsAtor = await prisma.$queryRawUnsafe(sql)

        return rsAtor
    } catch (error) {
        return false
    }
}

module.exports = {
    selectAllAtores,
    insertAtor,
    updateAtor,
    deleteAtor,
    selectByIdAtor
}