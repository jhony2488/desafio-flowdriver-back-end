export = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('LogsClients', [
      {
        prohibited: new Date(),
        idUser: 1,
        exit: null,
        price: null,
        paidOut: false,
        paidOutPrice: null,
        changeValue: null,
        priceVehicle: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        prohibited: new Date(),
        idUser: 2,
        exit: null,
        price: null,
        paidOut: false,
        paidOutPrice: null,
        changeValue: null,
        priceVehicle: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        prohibited: new Date(),
        idUser: 2,
        exit: null,
        price: null,
        paidOut: false,
        paidOutPrice: null,
        changeValue: null,
        priceVehicle: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('LogsClients', null, {});
  },
};
