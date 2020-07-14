'use strict';
var User = require('../models/index').User

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'Luiz Gustavo Santos',
        username: 'gustavosmc',
        permission: 4,
        password: `${User.generateHash('gustavosmc')}`,
        email: 'luizgustavosmc@gmail.com',
        tenant_id: 1,
      }
    ], {
      validate: true, 
      individualHooks: true,
    });
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
