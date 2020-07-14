import HttpStatus from 'http-status-codes'

export const permissions = {
  LOW: 1, // Visualizar dados, escopo fazenda
  MEDIUM: 2, // adicionar, remover, visualizar dados, escopo fazenda
  HIGH: 3, // inserir novos usuarios, escopo fazenda

  ADMIN: 4, // Acesso a todos dados
}

/**
 * Adiciona 'permission' para 'req'
 * @param {Sequelize} db 
 * @param {Integer} minimunPermission 
 */
export function permission(db, minimunPermission) {
  return (req, res, next) => {
    db.User.findByPk(req.user).then(user => {
      if(user){
        if(user.permission >= minimunPermission){
          req.permission = user.permission 
          next()
        }else{
          res.status(HttpStatus.FORBIDDEN).json({message: "Sem permissão"})
        }
      }else{
          res.status(HttpStatus.FORBIDDEN).json({message: "Sem permissão"})
      }
    }).catch(error => { 
      res.json(HttpStatus.FORBIDDEN).json({message: "Erro em permissão"})
    })
  }
}
  
