export const logStatus = {
    LOG_HIDE:            0,
    LOG_SUCCESS:         1,
    LOG_PARTIAL_SUCCESS: 2,
    LOG_FAIL:            3,
}

export const status = {
    INATIVO: 0,
    ATIVO  : 1
}

export const tipoProduto = {
    COMIDA: 1,
    BEBIDA: 2
}

export const nivelPermissao = {
    BAIXO: 1, // Vendedor, realizar vendas
    MEDIO: 2, // Adicionar novos produtos
    ALTO:  3, // Adicionar novos usuarios
}

export const tipoPagamento = {
    DINHEIRO: 1, 
    CREDITO : 2, 
    DEBITO  : 3,
    DINHEIRO_CREDITO: 4,
    DINHEIRO_DEBITO: 5,
    CREDITO_DEBITO: 6,
    CREDITO_DEBITO_DINHEIRO: 7,
    CORTESIA: 8
}

export const vendaStatus = {
    CANCELADA: 0, // Venda fechada por algum motivo
    ANDAMENTO: 1, // Venda ainda esta em andamento
    RECEBIDA: 2,  // Pagamento foi recebido, tickets entregues
    FINALIZADA: 3,// Todos os produtos ja foram entregues
    CONTABILIZADA: 4 // Foi fechada no relatorio de caixa
}


