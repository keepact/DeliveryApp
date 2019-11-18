import * as Yup from 'yup';
import Delivery from '../models/Delivery';

class DeliveryController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const delivery = await Delivery.findAll({
      limit: 10,
      offset: (page - 1) * 10,
      attributes: ['id', 'name', 'date', 'start_point', 'end_point'],
    });

    res.json(delivery);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      date: Yup.date().required(),
      start_point: Yup.string().required(),
      end_point: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, name, date, start_point, end_point } = req.body;

    const deliveryExists = await Delivery.findOne({
      where: { name: req.body.name, date: req.body.date },
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
