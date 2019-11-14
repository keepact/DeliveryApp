import Order from '../models/Order';
import Client from '../models/Client';

class OrderController {
  async store(req, res) {
    const { client_id } = req.params;
    const { store_id, value, date } = req.body;

    const client = await Client.findByPk(client_id);

    if (!client) {
      return res.status(400).json({ error: 'Cliente não encontrado' });
    }

    const order = await Order.create({
      store_id,
      value,
      date,
      client_id,
    });

    return res.json(order);
  }
}

export default new OrderController();
