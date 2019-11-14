import Address from '../models/Address';
import Client from '../models/Client';

class AddressController {
  async index(req, res) {
    const { client_id } = req.params;

    const client = await Client.findByPk(client_id, {
      include: { association: 'addresses' },
    });

    res.json(client);
  }

  async store(req, res) {
    const { client_id } = req.params;
    const { zipcode, street, number } = req.body;

    const client = await Client.findByPk(client_id);

    if (!client) {
      return res.status(400).json({ error: 'Cliente não encontrado' });
    }

    const address = await Address.create({
      zipcode,
      street,
      number,
      client_id,
    });

    return res.json(address);
  }
}

export default new AddressController();
