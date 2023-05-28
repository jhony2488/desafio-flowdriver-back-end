
export = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UserVehicleType', [
      {
        userId: 1,
        vehicleTypeId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserVehicleType', null, {});
  }
};
