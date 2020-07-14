import { tryAwait, makeFields, responseError } from '../utils/util'
import { dbActions} from '../utils/api_constants'
import authorization from './middlewares/authorization'
import { permission, permissions }  from './middlewares/permission'

export default (db, api) => {
    const Sale = db.Sale

    api.get('/sales', authorization, permission(db, permissions.LOW), async (req, res) => {
        const attributes = makeFields(req)
        let query = {...req.query}
        tryAwait(Sale.findAll(
            {
                where: {...query, tenant_id: req.tenant},
                ...attributes,
                include: {
                    model: db.ProductSale, as: 'product_sales'
                }
            }
        ), res, dbActions.SELECT)
    })

    api.post('/sales', authorization, permission(db, permissions.LOW),  async (req, res) => {
        const transaction = await db.sequelize.transaction();
        try{
            const sale = await Sale.create({ ...req.body,  tenant_id: req.tenant, user_id: req.user}, {transaction})
            if (sale) {
                const products = req.body.products
                for(let i = 0; i < products.length; i+=1) {
                    await db.ProductSale.create({...products[i], sale_id: sale.id, tenant_id: req.tenant}, {transaction})
                }
                transaction.commit();
                res.status(201).json(sale);
            } else {
                throw new Error('Error create sale');
            }
        }catch(error) {
            transaction.rollback();
            responseError(error, res);
        }
       
    })

    api.put('/sales/:id', authorization, permission(db, permissions.HIGH), async (req, res) => {
        try{
            const sale = await Sale.findOne({where: {id: req.params.id,  tenant_id: req.tenant}})
            tryAwait(sale.update(req.body), res, dbActions.UPDATE)
        }catch(error) {
            res.status(400).json({message: 'Failed to update sale'})
        }
    })

    api.delete('/sales/:id', authorization, permission(db, permissions.HIGH),  async (req, res) => { 
        const transaction = await db.sequelize.transaction();
        try{
            const sale = await Sale.findOne({where: {id: req.params.id,  tenant_id: req.tenant}})
            await db.ProductSale.destroy({where: {sale_id: sale.id}}, {transaction})
            await sale.destroy({transaction})
            transaction.commit()
            res.status(200).json({sale})
        }catch(error) {
            transaction.rollback()
            res.status(400).json({message: 'Failed to destroy sale'})
        }
    })

}