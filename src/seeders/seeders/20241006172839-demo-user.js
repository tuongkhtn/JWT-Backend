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
    await queryInterface.bulkInsert('USERS', 
      [
        {
          EMAIL: 'tuong@gmail.com',
          NAME: 'tuong',
          PASSWORD: '123jfja'
        },
        {
          EMAIL: 'tuong123@gmail.com',
          NAME: 'tuonge2qe',
          PASSWORD: '123jfjaccada'
        },
        {
          EMAIL: 'tuonge2ea@gmail.com',
          NAME: 'tuongcaaa',
          PASSWORD: '123jfjadq3wq'
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
