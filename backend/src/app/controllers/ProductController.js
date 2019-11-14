import Product from '../models/Product';
import Order from '../models/Order';

class ProductController {
  async store(req, res) {
    const { order_id } = req.params;
    const { name, description, quantity, value } = req.body;

    const order = await Order.findByPk(order_id);

    if (!order) {
      return res.status(400).json({ error: 'Pedido não encontrado' });
    }
    const product = await Product.create({
      name,
      description,
      quantity,
      value,
      order_id,
    });

    return res.json(product);
  }
}

export default new ProductController();
