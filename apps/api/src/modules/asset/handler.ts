import { Router, type Router as ExpressRouter } from 'express';

import upload from '../../utils/upload';
import {
  addAssetController,
  deleteAssetController,
  getAllAssetsController,
  getAssetByCategoryController,
  updateAssetController,
} from './controller';

const router: ExpressRouter = Router();

// add background
router.post('/', upload().single('asset'), addAssetController);

//get all assets
router.get('/', getAllAssetsController);

//get assets by category
router.get('/:categoryId', getAssetByCategoryController);

//delete asset
router.delete('/:id', deleteAssetController);

//update asset
router.put('/:id', upload().single('asset'), updateAssetController);

export default router;
