'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try{
      await queryInterface.addColumn(
        'Sales',
        'amount',
        {
          type: Sequelize.DOUBLE,
          allowNull: false,
          defaultValue: 0
        }
      )
      return Promise.resolve()
    }catch(error){
      return Promise.reject(error)
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('Sales', 'amount')
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }
};