
import { filterKeys, tryAwait, filterQuerys } from '../utils/util'
import { dbActions } from '../utils/api_constants'
import { permission } from './middlewares/permission_middleware'
import { nivelPermissao, status } from '../../constants/app_constants'

export default (config, db, api, authorization) => {
    const Produto = db.Produto
    const createFilter = ['descricao', 'preco', 'foto', 'tipo', 'estoque', 'status', 'preco_variavel']
    const getFilter = createFilter.concat(['id'])
    const updateFilter = createFilter

     // Create
    api.post('/produtos', authorization,  permission(db, nivelPermissao.MEDIO), async (req, res) => {
        filterKeys(req.body, createFilter)
        tryAwait(Produto.build(req.body).save(), res, dbActions.CREATE)
    })

    // Get 
    api.get('/produtos', authorization, async (req, res) => {
       filterQuerys(req.query, getFilter)
       tryAwait(Produto.findAll({where: {status: status.ATIVO, ...req.query}}), res, dbActions.SELECT)
    })

    // Update 
    api.put('/produtos/:id', authorization, permission(db, nivelPermissao.MEDIO), async (req, res) => {
        filterKeys(req.body, updateFilter)
        tryAwait(Produto.update(req.body, {where: {id: req.params.id}}), res, dbActions.UPDATE)
    })
}