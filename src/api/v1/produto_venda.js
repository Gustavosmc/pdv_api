
import { filterKeys, tryAwait, filterQuerys } from '../utils/util'
import { dbActions } from '../utils/api_constants'
import { permission } from './middlewares/permission_middleware'
import { nivelPermissao, status, vendaStatus } from '../../constants/app_constants'

export default (config, db, api, authorization) => {
    const ProdutoVenda = db.ProdutoVenda
    const createFilter = ['venda_id', 'produto_id', 'valor', 'descricao']
    const getFilter = createFilter.concat(['id'])
    const updateFilter = createFilter

     // Create
    api.post('/produtoVendas', authorization,  permission(db, nivelPermissao.MEDIO), async (req, res) => {
        filterKeys(req.body, createFilter)
        const venda = await db.Venda.findOne({where: {id: req.body.venda_id}}).catch(erro => {
            res.status(400).json({message: 'Venda não encontrada!'})
        })
        if(venda){
            if(venda.status === vendaStatus.ANDAMENTO){
                tryAwait(ProdutoVenda.build(req.body).save(), res, dbActions.CREATE)
            }else{
                res.status(400).json({message: "Venda não está aberta!"})
            }
        }
        
    })

    // Get 
    api.get('/produtoVendas', authorization, async (req, res) => {
       filterQuerys(req.query, getFilter)
       tryAwait(ProdutoVenda.findAll({where: {...req.query}}), res, dbActions.SELECT)
    })

    // Update 
    api.put('/produtoVendas/:id', authorization, permission(db, nivelPermissao.MEDIO), async (req, res) => {
        filterKeys(req.body, updateFilter)
        tryAwait(Produto.update(req.body, {where: {id: req.params.id}}), res, dbActions.UPDATE)
    })

   
}