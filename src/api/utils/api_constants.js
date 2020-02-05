
export const dbActions = {
    SELECT : "SELECT", 
    CREATE : "CREATE", 
    UPDATE : "UPDATE", 
    DELETE : "DELETE"
}

export const errorMsgs = {
    SELECT : "Falha ao buscar {}!",
    CREATE : "Não foi possível salvar {}!",
    UPDATE : "Falha ao atualizar {}!",
    DELETE : "Falha ao excluir {}!",
}

export const errorMsg = (model, type) => {
    return (errorMsgs[type.toUpperCase()] || "").replace('{}', model) || ""
}