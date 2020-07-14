import HttpStatus from 'http-status-codes'
import { filterKeys, tryAwait, filterQuerys, responseError } from '../utils/util'
import { sendRecoverEmail } from '../../mail/sendgrid'
import { status, dbActions } from '../utils/api_constants'
import authorization from './middlewares/authorization'

const jwt = require("jsonwebtoken")

export default (db, api) => {
    const User = db.User

    // Post Login
    api.post('/users/login', async (req, res) => {
        const pass = req.body.password || ""
        const where = {}
        if(req.body.email) where.email = req.body.email
        if(req.body.username) where.username = req.body.username
        try{
            const user = await User.findOne({where: {...where}})
            if (user && User.validPassword(pass, user)) {
                user.token = jwt.sign({user: user.id, tenant: user.tenant_id}, process.env.SECRET, {
                    expiresIn: '7d'
                })
                res.status(HttpStatus.OK).json(user);
            } else {
                res.status(HttpStatus.UNAUTHORIZED).json({ message: "Authentication fail" })
            }
        }catch(error) {
            res.status(500).json({
                message: "Erro ao realizar login",
                error: error.message
            })
        }
    })

    // Recover Password
    api.post('/users/recover/:token', authorization, async (req, res) => {
        filterKeys(req.body, ['password'])
        User.findOne({where: {id: req.userId}}).then(user => {
            if(user){
                const password = User.generateHash(req.body.password)
                user.update({password}).then(() => {
                        res.status(HttpStatus.OK).json({message: "Nova senha cadastrada com sucesso!"})
                }).catch(error => {
                    res.status(HttpStatus.BAD_REQUEST).json({message: "Erro o atualizar senha do usuario"})
                })
            }else{
                res.status(HttpStatus.BAD_REQUEST).json({message: 'Este token é inválido, solicite uma nova recuperação de senha!'})
            }
        })
    })

    // Get send email for recover password
    api.get('/users/recover/:email/:url', (req, res) => {
        const url = req.params.url.replace(/-/g, '\/')
        const email = req.params.email
        User.findOne({ where: { email } }).then(user => {
            if (user) {
                const token = jwt.sign({id: user.id}, process.env.SECRET, {
                    expiresIn: '1h'
                })
                sendRecoverEmail(email, user.email, `${url}/${token}`, response => {
                    if (response) {
                        res.status(HttpStatus.OK).json('Email enviado com sucesso!')
                    } else {
                        res.status(HttpStatus.BAD_REQUEST).json("Falha ao enviar email")
                    }
                })
            } else {
                res.status(HttpStatus.BAD_REQUEST).json({ message: "Email não está cadastrado" })
            }
        }).catch(error => {
            responseError(error)
        })
    })

    // Get Users
    api.get('/users', authorization, async (req, res) => {
        filterQuerys(req.query, ['id', 'name', 'username', 'email', 'status'])
        User.findAll({where: {...req.query, tenant_id: req.tenant}}).then(users => {
            res.status(HttpStatus.OK).json(users)
        })
    })

    // Get logged User
    api.get('/user', authorization, (req, res) => {
        User.findOne({where: {id: req.user, status: status.ACTIVE}}).then(user => {
            res.status(HttpStatus.OK).json(user)
        }).catch(error => {
            res.status(HttpStatus.UNAUTHORIZED).json({message: "Sem autorização! Faça Login!"})
        })
    })

    // Create User
    api.post('/users', authorization, async (req, res) => {
        filterKeys(req.body, ['fullname', 'password', 'username', 'status', 'email'])
        tryAwait(User.build({...req.body, tenant_id: req.tenant}).save(), res, dbActions.CREATE)
    })

    // Update User
    api.put('/users/:id', authorization, async (req, res) => {
        filterKeys(req.body, ['username', 'name', 'password', 'status', 'email'])
        const id = req.params.id
        tryAwait(User.update(req.body, {where: { id, tenant_id: req.tenant}}), res, dbActions.UPDATE)
    })

}