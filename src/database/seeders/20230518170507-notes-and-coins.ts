
export = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('NotesAndCoins', [
      {
        amount: 5,
        value: '5',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        amount: 5,
        value: '2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        amount: 5,
        value: '10',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        amount: 5,
        value: '20',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        amount: 5,
        value: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        amount: 5,
        value: '0,5',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('NotesAndCoins', null, {});
  }
};
