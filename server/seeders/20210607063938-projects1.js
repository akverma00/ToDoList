'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('ListItems', [{
      title: 'Project 1',
      completed: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Project 2',
      completed: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Project 3',
      completed: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Project 744',
      completed: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Project 498',
      completed: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Project 488',
      completed: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Project 42',
      completed: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('ListItems', null, {});
  }
};
