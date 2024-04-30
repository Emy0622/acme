/******************************************************************************************
Objetivo: Arquivo responsável pelas configurações globais de mensagens, valores, conteúdos para o projeto
Data: 20/02/1014
Autora: Yasmin Targino
Versão: 1.0
*****************************************************************************************/

// MENSAGENS DE ERRO

const ERROR_INVALID_ID = { status: false, status_code: 400, message: 'O ID encaminhado na requisição não é válido!!!' }

const ERROR_REQUIRED_FIELDS = { status: false, status_code: 400, message: 'Existem dados obrigatórios que não foram preenchidos corretamente' }

const ERROR_NOT_FOUND = { status: false, status_code: 404, message: 'Nenhum item encontrado na requisição' }

const ERROR_TERMINAL_SERVER_DB = { status: false, status_code: 500, message: 'Ocorreram erros internos no servidor de banco de dados, por favor contate o adm do sistema' }

const ERROR_CONTENT_TYPE = { status: false, status_code: 415, message: 'o tipo de mídia Content-type da solicitação não é suportado, accetable format: application/json' }

const ERROR_INTERNAL_SERVER = { status: false, status_code: 500, message: 'Ocorreram erros internos no servidor na camada de negócios da API, por favor contate o adm do sistema' }

//-------------------------------------------------------------------------------------//

// MENSAGENS DE SUCESSO 
const SUCESS_CREATED_ITEM = { status: true, status_code: 201, message: 'Item criado com sucesso!!!' }

const REQUEST_SUCCEEDED = { status: true, status_code: 200, message: 'A solicitação foi bem-sucedida!!!' }

module.exports = {
    ERROR_INVALID_ID,
    ERROR_REQUIRED_FIELDS,
    ERROR_NOT_FOUND,
    ERROR_TERMINAL_SERVER_DB,
    SUCESS_CREATED_ITEM,
    ERROR_CONTENT_TYPE,
    ERROR_INTERNAL_SERVER,
    REQUEST_SUCCEEDED
}