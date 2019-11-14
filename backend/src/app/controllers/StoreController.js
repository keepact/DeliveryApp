import * as Yup from 'yup';
import Store from '../models/Store';

class StoreController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      zipcode: Yup.number().required(),
      street: Yup.string().required(),
      number: Yup.number()
        .required()
        .min(2),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const storeExists = await Store.findOne({ where: { name: req.body.name } });

    if (storeExists) {
      return res.status(400).json({ error: 'Store already exist' });
    }

    const { id, name, zipcode, street, number } = await Store.create(req.body);

    return res.json({
      id,
      name,
      zipcode,
      street,
      number,
    });
  }
}

export default new StoreController();
