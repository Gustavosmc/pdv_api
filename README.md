Execução
  - estrutura do Projeto ECS6
    * https://github.com/developit/express-es6-rest-api

 * Após clonar o projeto
 * Entrar na pasta do projeto e executar:
 
 * 1 - Instalar sequelize-cli -> npm install --save-dev sequelize-cli
    dentro da pasta src/ executar:
    --> npx sequelize db:migrate
    --> npx sequelize db:seed

*  2 - Executar ambiente Dev:
    dentro da pasta raiz:
    --> npm run dev --max_old_space_size=4096
 

 Após a instalação dos módulos executar:
 

BackEnd
  * Banco de dados -> Mysql
  * Linguagem      -> JavaScript
  * Framework      -> Express, site: https://expressjs.com/pt-br/
  * Framework ORM  -> Sequelize, site: https://sequelize.org/master/manual/migrations.html#bootstrapping
  * API Rest json

Ferramenta de teste da api
  * Postman


Sequelize:
  Exemplo criando o Modelo Usuario usando o sequelize-cli
  * npx sequelize-cli model:generate --name Usuario --attributes nome:string,usuario:string,email:string,senha:string
