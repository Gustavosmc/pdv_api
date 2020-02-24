'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.addColumn(
          'Vendas',
          'total',
          {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: 0
          }
        ),
        queryInterface.addColumn(
          'Vendas',
          'troco',
          {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: 0
          }
        ),
      ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Vendas', 'total'),
      queryInterface.removeColumn('Vendas', 'troco')
    ]);
  }
};
