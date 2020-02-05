import { filterKeys, tryAwait, filterQuerys } from '../utils/util'
import { dbActions } from '../utils/api_constants'
import {  vendaStatus, status } from '../../constants/app_constants'

export default (config, db, api, authorization) => {
    const Venda = db.Venda
    const createFilter = []
    const getFilter = createFilter.concat(['id'])
    const updateFilter = ['tipo_pagamento', 'valor_credito', 'valor_debito', 'valor_dinheiro', 'desconto']

     // Create
    api.post('/vendas', authorization, async (req, res) => {
        filterKeys(req.body, createFilter)
        tryAwait(Venda.build({...req.body, usuario_id: req.userId}).save(), res, dbActions.CREATE)
    })

    // Get 
    api.get('/vendas', authorization, async (req, res) => {
       filterQuerys(req.query, getFilter)
       tryAwait(Venda.findAll({
           where: {...req.query},
           include: [
               {
                    model: db.ProdutoVenda, as: 'produto_vendas',
                    attributes: ['id', 'descricao', 'valor', 'produto_id', 'codigo', 'status']
               }
           ]
        }), res, dbActions.SELECT)
    })

    // Update venda com status em ANDAMENTO
    api.put('/vendas/:id', authorization, async (req, res) => {
        filterKeys(req.body, updateFilter)
        tryAwait(Venda.update(req.body, {where: {id: req.params.id, status: vendaStatus.ANDAMENTO}}), res, dbActions.UPDATE)
    })
    
}