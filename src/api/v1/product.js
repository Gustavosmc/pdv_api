import { tryAwait, makeFields } from '../utils/util'
import { dbActions} from '../utils/api_constants'
import authorization from './middlewares/authorization'
import { permission, permissions }  from './middlewares/permission'

export default (db, api) => {
    const Product = db.Product

    api.get('/products', authorization, permission(db, permissions.LOW), async (req, res) => {
        const attributes = makeFields(req)
        let query = {...req.query}
        tryAwait(Product.findAll({
            where: {...query},
            ...attributes,
            tenant_id: req.tenant
        }), res, dbActions.SELECT)
    })

    api.post('/products', authorization, permission(db, 2),  async (req, res) => {
        tryAwait(Product.create({ ...req.body,  tenant_id: req.tenant}), res, dbActions.CREATE)
    })

    api.put('/products/:id', authorization, permission(db, 2), async (req, res) => {
        try{
            const product = await Product.findOne({where: {id: req.params.id,  tenant_id: req.tenant}})
            tryAwait(product.update(req.body), res, dbActions.UPDATE)
        }catch(error) {
            res.status(400).json({message: 'Failed to update product'})
        }
    })

    api.delete('/products/:id', authorization, permission(db, 2),  async (req, res) => {
        try{
            const product = await Product.findOne({where: {id: req.params.id,  tenant_id: req.tenant}})
            tryAwait(product.destroy(), res, dbActions.UPDATE)
        }catch(error) {
            res.status(400).json({message: 'Failed to destroy product'})
        } 
    })

}