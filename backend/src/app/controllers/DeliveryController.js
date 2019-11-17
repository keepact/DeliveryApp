import Delivery from '../models/Delivery';

class DeliveryController {
  async index(req, res) {
    const delivery = await Delivery.findAll();

    res.json(delivery);
  }

  async store(req, res) {
    const { id, name, date, start_point, end_point } = req.body;

    const deliveryExists = await Delivery.findOne({
      where: { name: req.body.name },
    });

    if (deliveryExists) {
      return res.status(400).json({ error: 'Entrega já existente' });
    }

    const delivery = await Delivery.create({
      id,
      name,
      date,
      start_point,
      end_point,
    });

    return res.json(delivery);
  }
}

export default new DeliveryController();
