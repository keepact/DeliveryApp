import * as Yup from 'yup';
import Client from '../models/Client';

class ClientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      phone: Yup.number()
        .required()
        .min(9),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const clientExists = await Client.findOne({
      where: { email: req.body.email },
    });

    if (clientExists) {
      return res.status(400).json({ error: 'Usuário já existe' });
    }

    const { id, name, email, phone } = await Client.create(req.body);

    return res.json({
      id,
      name,
      email,
      phone,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      phone: Yup.string().min(9),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email } = req.body;

    const client = await Client.findByPk(req.params.id);

    if (email !== client.email) {
      const clientExists = await Client.findOne({ where: { email } });

      if (clientExists) {
        return res.status(400).json({ error: 'Cliente já existe' });
      }
    }
    const { id, name, phone } = await client.update(req.body);

    return res.json({ id, name, email, phone });
  }
}

export default new ClientController();
