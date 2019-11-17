import { Router } from 'express';

import DeliveryController from './app/controllers/DeliveryController';
import MapController from './app/controllers/MapController';

const routes = new Router();

routes.get('/deliveries', DeliveryController.index);
routes.post('/deliveries', DeliveryController.store);

routes.get('/deliveries/:id', MapController.index);

export default routes;
