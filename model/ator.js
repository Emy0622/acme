// Objetivo: Criar a interação do banco de dados MySql para fazer o CRUD de ATORES
// Data: 2024-04-16
// Autor: Eduardo Goncalves
// Versao: 1.0.4.24

// import da biblioteca do Prisma Client
const { PrismaClient } = require('@prisma/client')

// istanciando o objeto prisma com as caracterisyicas do prisma client
const prisma = new PrismaClient()

// listar todos os filmes existentes na tabela
const selectAllAtores = async function() {

    try {

        // sql script para listar todos os filmes existentes
        let sql = 'SELECT * FROM tbl_ator ORDER BY id_atores DESC'

        // $queryRawUnsafe(sql) --- encaminha apenas a variável
        // $queryRaw('SELECT * FROM tbl_filme') --- encaminha o script

        let rsAtores = await prisma.$queryRawUnsafe(sql)

        return rsAtores

    } catch (error) {
        return false
    }
}

const insertAtor = async function(dadosFilme) {

}

const updateAtor = async function(id) {

}

const deleteAtor = async function(id) {

    try {

        // sql script para deletar os filmes por id
        let sql = `DELETE FROM tbl_ator WHERE id_atores=${id};`

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
        let sql = `SELECT * FROM tbl_ator WHERE id_atores =${id}`

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




// // Aqui estamos usando o Prisma Client, que é uma ferramenta de banco de dados ORM (Object-Relational Mapping) para interagir com o banco de dados MySQL.
// const { PrismaClient } = require('@prisma/client')

// // Estamos criando uma instância do Prisma Client para usar em nossas operações de banco de dados.
// const prisma = new PrismaClient()

// // Essa função seleciona todos os atores da tabela no banco de dados.
// const selectAllAtores = async function() {
//     try {
//         // Montamos um SQL script para selecionar todos os atores ordenados por ID de forma decrescente.
//         let sql = 'SELECT * FROM tbl_ator ORDER BY id_atores DESC'
//         // Executamos a consulta usando o método $queryRawUnsafe do Prisma.
//         let rsAtores = await prisma.$queryRawUnsafe(sql)
//         return rsAtores
//     } catch (error) {
//         return false
//     }
// }

// // Aqui teríamos uma função para inserir um novo ator no banco de dados, mas parece que ainda não foi implementada.

// // Também temos uma função para atualizar um ator no banco de dados, mas está vazia no momento.

// // Essa função exclui um ator do banco de dados com base em seu ID.
// const deleteAtor = async function(id) {
//     try {
//         // Montamos um SQL script para deletar um ator com base em seu ID.
//         let sql = `DELETE FROM tbl_ator WHERE id_atores=${id};`
//         // Executamos a consulta usando o método $queryRawUnsafe do Prisma.
//         let rsAtores = await prisma.$queryRawUnsafe(sql)
//         return rsAtores
//     } catch (error) {
//         return false
//     }
// }

// // Essa função seleciona um ator específico com base em seu ID.
// const selectByIdAtor = async function(id) {
//     try {
//         // Montamos um SQL script para selecionar um ator com base em seu ID.
//         let sql = `SELECT * FROM tbl_ator WHERE id_atores =${id}`
//         // Executamos a consulta usando o método $queryRawUnsafe do Prisma.
//         let rsAtor = await prisma.$queryRawUnsafe(sql)
//         return rsAtor
//     } catch (error) {
//         return false
//     }
// }

// // Exportamos as funções para que elas possam ser usadas em outros arquivos.
// module.exports = {
//     selectAllAtores,
//     deleteAtor,
//     selectByIdAtor
// }

