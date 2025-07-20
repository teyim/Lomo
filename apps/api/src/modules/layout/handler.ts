import { Router, type Router as ExpressRouter } from 'express';
import { getLayoutsController } from './controller';

const router: ExpressRouter = Router();

router.get('/', getLayoutsController);

export default router;
