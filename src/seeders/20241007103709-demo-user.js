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
          email: 'htt@gmail.com',
          name: 'tuong',
          password: '1234',
          address: "Quang Nam",
          phone: "010203",
          sex: "Male",
          groupId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'htt@gmail.com',
          name: 'tuong',
          password: '1234',
          address: "Quang Nam",
          phone: "010203",
          sex: "Male",
          groupId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'htt@gmail.com',
          name: 'tuong',
          password: '1234',
          address: "Quang Nam",
          phone: "010203",
          sex: "Male",
          groupId: 1,
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
