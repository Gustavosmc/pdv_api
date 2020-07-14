import HttpStatus from 'http-status-codes'
import jwt from 'jsonwebtoken'

export default function authorization(req, res, next, secret=process.env.SECRET) {
	try{
		let token = null
		if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
			token = req.headers.authorization.split(' ')[1];
		else if (req.params && req.params.token) token = req.params.token
		else if (req.query && req.query.token) token = req.query.token
		else if (req.headers.authorization) token = req.headers.authorization
		if (!token)
			res.status(HttpStatus.UNAUTHORIZED).
			send({ message: 'Nenhum token de autenticação encontrado!', auth: false }
		)
		jwt.verify(token, secret, (err, decoded) => {
			req.user = decoded.user;
			req.tenant = decoded.tenant;
			next()
		})
	}catch(error){
		res.status(401).send({message: "Token de autenticação inválido"})
	}
}