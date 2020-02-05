import HttpStatus from 'http-status-codes'

export const consts = {
  BAIXO: 1, // Funcionarios, vendedores, etc
  MEDIO: 2, // Gestores, aprovadores
  ALTO : 3 // Diretor, Gerentes, administradores
}

export function permission(db, minimunPermission) {
  return (req, res, next) => {
    db.Usuario.findByPk(req.userId).then(usuario => {
      if(usuario){
        if(usuario.nivel_permissao >= minimunPermission){
           next()
        }else{
          res.status(HttpStatus.FORBIDDEN).json({message: "Sem autorização"})
        }
      }else{
          res.status(HttpStatus.FORBIDDEN).json({message: "Sem autorização"})
      }
    }).catch(error => { 
      res.json(HttpStatus.FORBIDDEN).json({message: "Sem autorização"})
    })
  }
}
  
