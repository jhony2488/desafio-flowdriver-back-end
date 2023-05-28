
export = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Clients', [
      {
        plate: '1chj5-5gfgh',
        VehicleTypeId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        plate: '1chj6-5gfgh',
        VehicleTypeId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        plate: '1chj7-5gfgh',
        VehicleTypeId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Clients', null, {});
  }
};
