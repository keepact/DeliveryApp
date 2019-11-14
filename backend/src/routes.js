import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import ClientController from './app/controllers/ClientController';
import AddressController from './app/controllers/AddressController';
import OrderController from './app/controllers/OrderController';
import ProductController from './app/controllers/ProductController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);
routes.use(authMiddleware);

routes.post('/users', UserController.store);
routes.put('/users', authMiddleware, UserController.update);

routes.post('/clients', ClientController.store);
routes.put('/clients/:id', ClientController.update);

routes.get('/clients/:client_id/addresses', AddressController.index);
routes.post('/clients/:client_id/addresses', AddressController.store);

routes.post('/clients/:client_id/orders', OrderController.store);
routes.post('/orders/:order_id/products', ProductController.store);

export default routes;
