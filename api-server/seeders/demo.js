module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        nickname: 'John Doe',
        email: 'demo@demo.com',
        passwordHash: '...',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])

    await queryInterface.bulkInsert('Admins', [
      {
        userId: 1,
        firstName: 'Hanako',
        lastName: 'Yamada',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
    await queryInterface.bulkDelete('Admins', null, {})
  }
}
