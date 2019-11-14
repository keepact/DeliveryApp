import Sequelize, { Model } from 'sequelize';

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        store_id: Sequelize.INTEGER,
        value: Sequelize.DECIMAL(10, 2),
        date: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Client, { foreignKey: 'client_id', as: 'client' });
    this.belongsTo(models.Store, { foreignKey: 'store_id', as: 'store' });
  }
}

export default Order;
