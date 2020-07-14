import { tryAwait, makeFields } from '../utils/util'
import { dbActions} from '../utils/api_constants'
import authorization from './middlewares/authorization'
import { permission, permissions }  from './middlewares/permission'

export default (db, api) => {
    const Tenant = db.Tenant

    /* Verifica validade do tenant */
    api.get('/tenants/:tenant_code',  async (req, res) => {
        const tenant = await Tenant.findOne({where: {tenant_code: req.params.tenant_code}})
        if ( tenant ) {
            res.status(200).json({message: 'Tenant is valid.'})
        } else {
            res.status(400).json({message: 'Tenant is not valid.'})
        }
    })

    api.get('/tenants', authorization, permission(db, permissions.ADMIN), async (req, res) => {
        const attributes = makeFields(req)
        let query = {...req.query}
        tryAwait(Tenant.findAll({
            where: {...query},
            ...attributes,
        }), res, dbActions.SELECT)
    })

    api.post('/tenants', permission(db, 4),  async (req, res) => {
        req.body.user_id = req.userId
        tryAwait(Tenant.create(req.body), res, dbActions.CREATE)
    })

    api.put('/tenants/:id', permission(db, 4), async (req, res) => {
       tryAwait(Tenant.update(req.body, {where: {id: req.params.id}}), res, dbActions.UPDATE)
    })

    api.delete('/tenants/:id', permission(db, 4),  async (req, res) => {
        tryAwait(Tenant.destroy({ where: { id: req.params.id }}), res, dbActions.DELETE)
    })

}