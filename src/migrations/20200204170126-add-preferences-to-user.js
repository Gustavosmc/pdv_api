'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try{
      await queryInterface.addColumn(
        'Users',
        'preferences',
        {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: ''
        }
      )
      return Promise.resolve()
    }catch(error){
      return Promise.reject(error)
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('Users', 'preferences')
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }
};