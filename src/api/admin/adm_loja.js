
import { tryAwait, getScope, filterKeys } from '../utils/util'
import { dbActions} from '../utils/api_constants'
import Sequelize from 'sequelize'

export default (config, db, api, authorization) => {
    const Loja = db.Loja
    const Op = Sequelize.Op
    
    // Get Lojas
	api.get('/admin/lojas', authorization, async (req, res) => {
        filterKeys(req.query, ['nome', 'cidade', 'uf', 'status'])
        if(req.query.cidade) req.query.cidade = {[Op.like]: `%${req.query.cidade}`}
        tryAwait(Loja.findAll({where: req.query}), res, dbActions.SELECT)
    })

    // Create
    api.post('/admin/lojas', authorization, async (req, res) => {
        tryAwait(Loja.build(req.body).save(), res, dbActions.CREATE)
    })

    // Delete ( Set status with 0 )
    api.delete('/admin/lojas/:id', authorization, async (req, res) => {
        const loja = await getScope(req.userId, db)
        tryAwait(loja.update({status: 0}), res, dbActions.DELETE)
    })

}
