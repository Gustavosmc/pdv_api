
export const IMAGES_PATH = "/home/iot/uploads/images"

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

export const dbActions = {
    SELECT : "SELECT", 
    CREATE : "CREATE", 
    UPDATE : "UPDATE", 
    DELETE : "DELETE",
    RESTORE: "RESTORE",
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
