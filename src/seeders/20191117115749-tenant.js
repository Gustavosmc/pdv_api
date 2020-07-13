'use strict';
const randomstring = require('randomstring')
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tenants', [
      {
        name: "Festa Teste",
        location: 'Unaí-MG Fazenda Tamboril',
        domain: 'localhost:3000',
        tenant_code: randomstring.generate(10),
        updatedAt: Sequelize.literal('NOW()'),
        createdAt: Sequelize.literal('NOW()')
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
