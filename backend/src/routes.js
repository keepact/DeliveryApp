import { Router } from 'express';

import DeliveryController from './app/controllers/DeliveryController';

const routes = new Router();

routes.post('/deliveries', DeliveryController.store);

export default routes;
