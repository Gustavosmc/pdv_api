'use strict';
var Usuario = require('../models/index').Usuario

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Usuarios', [
      {
        nome: 'Luiz Gustavo Santos',
        usuario: 'gustavosmc',
        nivel_permissao: 3,
        status: 1,
        senha: `${Usuario.generateHash('gustavosmc')}`,
        email: 'luizgustavosmc@gmail.com',
        updatedAt: Sequelize.literal('NOW()'),
        createdAt: Sequelize.literal('NOW()')
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
