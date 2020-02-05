import HttpStatus from "http-status-codes";
import { sendRecoverEmail } from "../../mail/sendgrid";
import { status, dbActions } from "../utils/api_constants";
import {
  filterKeys, tryAwait, filterQuerys, responseError,
} from "../utils/util";
import { permission, consts } from "./middlewares/permission_middleware";

const jwt = require("jsonwebtoken");

export default (config, db, api, authorization) => {
  const Usuario = db.Usuario;

  // Post Login
  api.post("/usuarios/login", (req, res) => {
    const email = req.body.email || ""
    const usuario = req.body.usuario || ""
    const pass = req.body.senha || ""
    const query = {}
    if(email) query.email = email
    if(usuario) query.usuario = usuario
    Usuario.findOne({ where: {...query}, order: [["createdAt", "DESC"]]})
      .then(usuario => {
        if (usuario && Usuario.validPassword(pass, usuario)) {
          usuario.token = jwt.sign({ id: usuario.id }, process.env.SECRET, {
            expiresIn: "1d",
          });
          res.status(HttpStatus.OK).json(usuario);
        } else {
          res.status(HttpStatus.UNAUTHORIZED).json({ message: "Falha na autenticação" });
        }
      })
      .catch(error => {
        db.Log.saveMessage(error.message, 0);
        res.status(500).json({
          message: "Erro ao realizar login",
          error: error.message,
        });
      });
  });

  // Recover Senha
  api.post("/usuarios/recuperar/:token", authorization, (req, res) => {
    filterKeys(req.body, ["senha"]);
    Usuario.find(req.userId).then(usuario => {
      if (usuario) {
        usuario
          .update({ senha: req.body.senha })
          .then(upUsuario => {
            res
              .status(HttpStatus.OK)
              .json({ message: "Nova senha cadastrada com sucesso!" });
          })
          .catch(error => {
            res
              .status(HttpStatus.BAD_REQUEST)
              .json({ message: "Erro o atualizar senha do usuario" });
          });
      } else {res
          .status(HttpStatus.BAD_REQUEST)
          .json({
            message:
              "Este token é inválido, solicite uma nova recuperação de senha!",
          });
      }
    });
  });

  // Get Enviar email de recuperacao de senha
  api.get("/usuarios/recuperar/:email/:url", (req, res) => {
    const url = req.params.url.replace(/-/g, "/");
    const email = req.params.email;
    db.Usuario
      .findOne({
        where: {
          email,
        },
      })
      .then(usuario => {
        if (usuario) {
          const token = jwt.sign({ id: usuario.id }, process.env.SECRET, {
            expiresIn: "1h",
          });
          sendRecoverEmail(
            email,
            usuario.usuario,
            `${url}#/recuperar/${token}`,
            response => {
              if (response) {
                res.status(HttpStatus.OK).json("Email enviado com sucesso!");
              } else {
                res
                  .status(HttpStatus.BAD_REQUEST)
                  .json("Falha ao enviar email");
              }
            }
          );
        } else {
          res
            .status(HttpStatus.BAD_REQUEST)
            .json({ message: "Email não está cadastrado" });
        }
      })
      .catch(error => {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: "Erro ao tentar recuperar senha" });
      });
  });

  // Get Usuarios
  api.get("/usuarios", authorization, permission(db, consts.MEDIO), async (req, res) => {
      filterQuerys(req.query, ["nome", "email", "status", "idx_consultor"]);
      db.Usuario.findAll({ where: { ...req.query } }).then(usuarios => {
        res.status(HttpStatus.OK).json(usuarios);
      });
    }
  );

  // Get Usuario Logado
  api.get("/usuario", authorization, (req, res) => {
    Usuario.findOne({ where: { id: req.userId, status: status.ATIVO } })
      .then(usuario => {
        res.status(HttpStatus.NO_CONTENT).json();
      })
      .catch(error => {
        res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: "Sem autorização! Faça Login!" });
      });
  });

  // Create Usuario
  api.post("/usuarios", authorization, permission(db, consts.ALTO), async (req, res) => {
      filterKeys(req.body, ["nome", "email", "senha", "status", "usuario", "nivel_permissao"]);
      tryAwait(Usuario.build(req.body).save(), res, dbActions.CREATE);
    }
  );

  // Update Usuario
  api.put( "/usuarios/:id", authorization, permission(db, consts.ALTO), async (req, res) => {
      filterKeys(req.body, ["nome", "usuario", "email", "senha", "status", "nivel_permissao"]);
      if (req.body.senha) {
        if (Usuario.validatePasswordSize(req.body.senha)) {
          req.body.senha = Usuario.generateHash(req.body.senha);
        } else {
          res.status(HttpStatus.BAD_REQUEST).json({
              errors: ["Tamanho da senha é inválido, mínimo 8 caracteres"],
            });
          return;
        }
      }
      let usuario = await Usuario.findOne({
        where: { id: req.params.id },
      }).catch(error => {
        db.Log.saveMessage(`Erro ao atualizar usuário: ${error.message}`);
        return undefined;
      });
      if(usuario){
        tryAwait(usuario.update(req.body), res, dbActions.UPDATE);
      }else{
        res.status(HttpStatus.BAD_REQUEST).json({errors: ["Usuário não encontrado"]})
      }
    }
  );
};
