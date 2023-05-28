import { QueryInterface, DataTypes } from 'sequelize';

export const up = async (queryInterface: QueryInterface) => {
  await queryInterface.createTable('LogsClients', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    prohibited: {
      type: DataTypes.STRING || DataTypes.DATE,
      allowNull: false,
    },
    exit: {
      type: DataTypes.STRING || DataTypes.DATE,
    },
    price: {
      type: DataTypes.FLOAT,
    },
    paidOut: {
      type: DataTypes.BOOLEAN,
    },
    paidOutPrice: {
      type: DataTypes.FLOAT,
    },
    changeValue: {
      type: DataTypes.FLOAT,
    },
    priceVehicle:{
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'Clients',
        key: 'id'
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
  });
};

export const down = async (queryInterface: QueryInterface) => {
  await queryInterface.dropTable('LogsClients');
};
