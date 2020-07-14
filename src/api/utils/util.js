import HttpStatus from 'http-status-codes'
import { dbActions } from '../utils/api_constants'
import Sequelize, { Op } from 'sequelize'
import moment from 'moment';

/**
 * Filtra os valores de um Array chave valor, excluindo os
 * @param {Array} values - Array<chave,valor> a serem filtrados, atenção será modificado internamente! 
 * @param {Array} keys - Array dos valores a serem filtrados
 */
export function filterKeys(values, keys) {
    Object.keys(values).forEach(function(key) {
        if(keys.indexOf(key) === -1) {
            delete values[key];
        }
    });
}

/**
 * Filtra os valores de um Array chave valor, excluindo os e adicona operador LIKE para querys
 * @param {Array} values - Array<chave,valor> a serem filtrados, atenção será modificado internamente!
 * @param {Array} keys - Array dos valores a serem filtrados
 */
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

/**
 * @param {Request} req - Requsição 
 * @param {Array} exclude - Campos a serem excluidos do SELECT
 */
export function makeFields(req, exclude=[]){
  let attributes = { attributes: { exclude: exclude || [] } }
  if(req.query.fields){
      const fields = req.query.fields.split(',')
      attributes = {attributes: fields}
  }
  return attributes
}

/**
 * 
 * @param {Error} error - Objeto error 
 * @param {Response} res - Response object 
 */
export function responseError(error, res){
  res.status(HttpStatus.BAD_REQUEST).json(
    {
      message: error.message,
      errors: error.errors ? error.errors.map(err => err.message) : [error.message],
    }
  )
}

export function toUTC(date){
  try{
      const utcDate = moment.utc(date).format()
      return utcDate
  }catch(error){
      return null
  }
}

/**
 * 
 * @param {String} field 
 * @param {any} startValue 
 * @param {any} endValue  
 */
export function makeBetweenQuery(field, startValue, endValue){
  return {
    [field]: {[Op.between]: [startValue, endValue]}
  }
}

/**
 * 
 * @param {Request} req 
 * @param {String} fieldName 
 */
export function makeScopeQuery(req, fieldName='id'){
   if(req.permission > 3) return {}
   else{
     return {
       [Op.or]: [
         {[fieldName]: req.scopes}
       ]
     }
   }
}

/**
 * @param {Promise} untilGetResult - Promise do Sequelize a ser processada  
 * @param {Response} res - Response object 
 * @param {String} type - Tipo de operação a ser feita, carregado de dbActions
 */
export const tryAwait = async ( untilGetResult, res, type='') => {
    try {
      const data = await untilGetResult
      if( ! data) {
        res.status(HttpStatus.BAD_REQUEST).json({message: "Falha na solicitação"})
        return
      }
      switch(type){
        case dbActions.CREATE:
          res.status(HttpStatus.CREATED).json(data)
          break
        case dbActions.UPDATE:
          res.status(HttpStatus.OK).json(data)
          break
        case dbActions.DELETE:
          res.status(HttpStatus.OK).json(data)
          break
        case dbActions.RESTORE:
          res.status(HttpStatus.OK).json(data)
          break
        default:
          res.status(HttpStatus.OK).json(data)
      }
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message || "Erro na operação",
        errors: error.errors ? error.errors.map(err => err.message) : []
      })
    }
}

export function extractDeleted(req){
  if(req.query.deleted){
    if(req.query.deleted === "true" || req.query.deleted === '1'){
      return false
    }
  }
  return true
}
