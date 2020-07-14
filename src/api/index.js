import { Router } from 'express'

import { version } from '../../package.json'
import tenant from './v1/tenant'
import user from './v1/user'
import product from './v1/product'
import sale from './v1/sale'

export default ({ config, db }) => {
	let api = Router();
	
	tenant(db, api)
	user(db, api)
	product(db, api)
	sale(db, api)

	// Versão da API
	api.get('/', (req, res) => {
		res.json({
			name  : "PDV API",
			version : version
		})
	})
	
	return api;
}
