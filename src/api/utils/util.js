import HttpStatus from 'http-status-codes'
import { dbActions } from '../utils/api_constants'
import Sequelize from 'sequelize'

/*
/ Deleta campos indevidos que seriam passados para a criacao ou atualizacao do model
*/
export function filterKeys(values, keys) {
    Object.keys(values).forEach(function(key) {
        if(keys.indexOf(key) === -1) {
            delete values[key];
        }
    });
}

export function filterQuerys(values, keys){
   const Op = Sequelize.Op
   Object.keys(values).forEach(function(key) {
    if(keys.indexOf(key) === -1) {
        delete values[key];
    }else if(values[key].toString().indexOf('%') > -1){
        values[key] = {[Op.like] : values[key]}
    }
});
}


export function responseError(error, res){
  res.status(HttpStatus.BAD_REQUEST).json(
    {
      message: error.message,
      errors: error.errors ? error.errors.map(err => err.message) : [error.message],
    }
  )
}

export const tryAwait = async ( untilGetResult, res, type='') => {
    try {
      const data = await untilGetResult
      if( ! data) {
        res.status(HttpStatus.BAD_REQUEST).json({message: "Falha na solicitação"})
        return
      }
      switch(type){
        case 'create':
          res.status(HttpStatus.CREATED).json(data)
          break
        case 'update':
          res.status(HttpStatus.OK).json({updated: data[0]})
          break
        case 'delete':
          res.status(HttpStatus.OK).json({deleted: data[0]})
        default:
          res.status(HttpStatus.OK).json(data)
      }
    } catch (error) {
      console.log(error)
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message || "Erro na operação",
        errors: error.errors ? error.errors.map(err => err.message) : []
      })
    }
}

export async function getScope(userId, db, res=undefined){
  try{
    const usuario = await db.Usuario.findByPk(userId)
    const scope = await usuario.getLoja()
    return scope
  }catch(error){
    if(res){
      res.status(HttpStatus.FORBIDDEN).json({
        message: "Sem permissão",
        error: error.message
      })
    }else{
      throw new Error("Error in the scope access")
    }
  }
}
