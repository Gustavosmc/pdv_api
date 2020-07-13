export const logStatus = {
    LOG_HIDE:            0,
    LOG_SUCCESS:         1,
    LOG_PARTIAL_SUCCESS: 2,
    LOG_FAIL:            3,
}

export const status = {
    INACTIVE: 0,
    ACTIVE  : 1
}

export const productType = {
    FOOD: 1,
    DRINK: 2
}

export const permission = {
    SLOW:  1, // Vendedor, realizar vendas
    MEDIUM: 2, // Gerenciar produtos
    HIGH:  3, // Adicionar novos usuarios
}

export const paymentType = {
    MONEY: 1, 
    CREDIT : 2, 
    DEBT  : 3,
    MONEY_CREDIT: 4,
    MONEY_DEBT: 5,
    CREDIT_DEBT: 6,
    CREDIT_DEBT_MONEY: 7,
    COURTESY: 8
}

export const saleStatus = {
    CANCELED: 0, // Venda fechada por algum motivo
    PROGRESS: 1, // Venda ainda esta em andamento
    RECEIVED: 2,  // Pagamento foi recebido, tickets entregues
    FINISHED: 3,// Todos os produtos ja foram entregues
    REPORTED: 4 // Foi fechada no relatorio de caixa
}


