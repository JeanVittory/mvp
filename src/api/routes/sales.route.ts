import { Router } from 'express';
import { registerSoldProduct } from '../controllers/sales/registerSoldProduct.controllers.';

const salesRouter = Router();

salesRouter.post('/', registerSoldProduct);

export { salesRouter };
