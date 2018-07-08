module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        nickname: 'Demo User 001',
        email: 'foo',
        passwordHash:
          ' $2b$10$bnbqqzWXpJ7sljuU6E0lh.Ajkwnno8AC2OcozAftXRODZxOvF4yZC',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])

    await queryInterface.bulkInsert('Brands', [
      {
        name: 'DEMO brand',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])

    await queryInterface.bulkInsert('UsersBrands', [
      {
        userId: 1,
        brandId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
    await queryInterface.bulkDelete('Brands', null, {})
    await queryInterface.bulkDelete('UsersBrands', null, {})
  }
}
