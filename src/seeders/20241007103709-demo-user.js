'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('User', 
      [
        {
          EMAIL: 'htt@gmail.com',
          NAME: 'tuong',
          PASSWORD: '1234',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          EMAIL: 'htt123@gmail.com',
          NAME: 'tuonadag',
          PASSWORD: '123q2das4',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          EMAIL: 'htdq2dat@gmail.com',
          NAME: 'dad',
          PASSWORD: '12sca34',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
