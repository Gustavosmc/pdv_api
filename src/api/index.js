import { version } from '../../package.json'
import { Router } from 'express'
import HttpStatus from 'http-status-codes'

import usuario from './v1/usuario'
import produto from './v1/produto.js'
import venda from './v1/venda.js'
import produto_venda from './v1/produto_venda.js'

const jwt = require('jsonwebtoken')

// Realiza a autenticacao atraves do token recebido
function authorization(req, res, next, secret=process.env.SECRET) {
	try{
		let token = null
		if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
			token = req.headers.authorization.split(' ')[1];
		else if (req.headers.authorization) token = req.headers.authorization
		else if (req.query && req.query.token) token = req.query.token;
		
		if (!token)
			res.status(HttpStatus.UNAUTHORIZED).
			send({ message: 'Nenhum token de autenticação encontrado!', auth: false }
		)
		jwt.verify(token, secret, (err, decoded) => {
			req.userId = decoded.id;
			next()
		})
	}catch(error){
		res.status(401).json({message: "Token de autenticação inválido"})
	}

}

// Realiza a autenticacao do Admin atraves do token recebido
function admin_authorization(req, res, next) {
	authorization(req, res, next, process.env.ADMIN_SECRET)
}

export default ({ config, db }) => {
	let api = Router();
	
	
	// API Usuarios
	usuario(config, db, api, authorization)
	produto(config, db, api, authorization)
	venda(config, db, api, authorization)
	produto_venda(config, db, api, authorization)
	

	// Versão da API
	api.get('/', (req, res) => {
		res.json({
			nome  : "Ifrota API",
			versao: version
		})
	})
	
	return api;
}
