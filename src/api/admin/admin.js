
import HttpStatus from 'http-status-codes'
import { filterKeys } from '../utils/util'
import { sendRecoverEmail } from '../../mail/sendgrid'

const jwt = require("jsonwebtoken")

export default (config, db, api, authorization) => {
    const Admin = db.Admin

    // Post Login
    api.post('/admin/login', (req, res) => {
        const user = req.body.usuario || ""
        const pass = req.body.senha || ""
        Admin.findOne({
            where: {
                usuario: user,
                status: 1
            },
            order: [['createdAt', 'DESC']],
        }).then(admin => {
            if (admin && Admin.validPassword(pass, admin)) {
                admin.token = jwt.sign({id: admin.id}, process.env.ADMIN_SECRET, {
                    expiresIn: '3h'
                })
                
                res.status(HttpStatus.OK).json(admin);
            } else {
                res.status(HttpStatus.UNAUTHORIZED).json({ message: "Falha na autenticação" })
            }
        }).catch(error => {
            db.Log.saveMessage(error.message, 0)
            res.status(500).json({
                message: "Erro ao realizar login",
                error: error.message
            })
        })
    })

    // Recover Admin
    api.post('/admin/recuperar/:token', authorization, (req, res) => {
        filterKeys(req.body, ['senha'])
        Admin.find(req.userId).then(admin => {
            if(admin){
                admin.update({senha: req.body.senha}).then(upAdmin => {
                        res.status(HttpStatus.OK).json({message: "Nova senha cadastrada com sucesso!"})
                }).catch(error => {
                    res.status(HttpStatus.BAD_REQUEST).json({message: "Erro o atualizar senha do Admin"})
                })
            }else{
                res.status(HttpStatus.BAD_REQUEST).json({message: 'Este token é inválido, solicite uma nova recuperação de senha!'})
            }
        })
    })


    // Get Enviar email de recuperacao de senha
    api.get('/admin/recuperar/:email/:url', (req, res) => {
        const url = req.params.url.replace(/-/g, '\/')
        const email = req.params.email
        Admin.findOne({
            where: {
                email
            }
        }
        ).then(admin => {
            if (admin) {
                const token = jwt.sign({id: usuario.id}, process.env.ADMIN_SECRET, {
                    expiresIn: '1h'
                })
                sendRecoverEmail(email, admin.usuario, `${url}#/recuperar/${token}`, response => {
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
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Erro ao tentar recuperar senha" })
        })
    })

    // Get Admin
    api.get('/admin', authorization, (req, res) => {
            db.Admin.findAll({
                where: {
                }
            }
            ).then(admins => {
                res.status(HttpStatus.OK).json(admins)
        })
    })

    // Create Admin
    api.post('/admin', authorization, (req, res) => {
        filterKeys(req.body, ['nome', 'senha', 'usuario', 'email', 'status'])
        Admin.build(req.body).save().then(admin => {
                res.status(HttpStatus.CREATED).json(admin)
            }).catch(error => {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    message: 'Falha ao salvar Administrador',
                    error: error.message,
                    errors: error.errors.map(err => err.message) || []
                })
            })
    })

    // Update Admin
    api.put('/admin/:id', (req, res) => {
        authorization(req, res, db, () => {
            filterKeys(req.body, ['nome', 'Admin', 'senha', 'status', 'email'])
            Admin.findOne({ where: { id: req.params.id } }).then(admin => {
                if (!admin) {
                    res.status(HttpStatus.BAD_REQUEST).json({
                        message: "Usuário não encontrado"
                    })
                } else {
                    if(admin.permissao === 3){
                            res.status(HttpStatus.BAD_REQUEST).json({message: 'Usuário não pode ser alterado'})
                    }else{
                        admin.update(req.body).then(upAdmin => {
                            res.status(HttpStatus.OK).json(upAdmin)
                        }).catch(error => {
                            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                                message: "Falha ao atualizar Admin",
                                error: error.errors
                            })
                        })
                    }
                }
            })
        })
    })

}