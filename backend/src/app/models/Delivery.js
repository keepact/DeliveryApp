import Sequelize, { Model } from 'sequelize';

class Delivery extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        date: Sequelize.DATE,
        start_point: Sequelize.STRING,
        end_point: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Delivery;
