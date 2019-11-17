import Delivery from '../models/Delivery';

class MapController {
  async index(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id);

    res.json(delivery);
  }
}

export default new MapController();
