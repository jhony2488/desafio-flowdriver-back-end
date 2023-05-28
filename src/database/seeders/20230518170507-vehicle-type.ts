
export = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('VehicleType', [
      {
        name: 'Carro',
        value: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Moto',
        value: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Caminhão',
        value: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('VehicleType', null, {});
  }
};
