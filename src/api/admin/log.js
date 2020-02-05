
import HttpStatus from 'http-status-codes'

export default (config, db, api, authorization) => {

    // Get logs
	api.get('/logs', authorization,(req, res) => {
		const Log = db.Log
		Log.findAll({
			where: {
				status: [1, 2, 3]
			},
			limit: 10,
			order: [
				['createdAt', 'DESC'],
			],
		}
		).then(logs => {
			res.status(HttpStatus.OK).json(logs)
		}).catch(error => {
			res.status(HttpStatus.BAD_REQUEST).json({message: "Erro ao carregar logs"})
		})
	})
}
