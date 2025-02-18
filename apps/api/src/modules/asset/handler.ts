import { Router } from 'express';
import { AWS_FOLDERS } from '../../constants';
import upload from '../../utils/upload';
import {
  addAssetController,
  deleteAssetController,
  getAllAssetsController,
  getAssetByCategoryController,
  updateAssetController,
} from './controller';

const router = Router();

// add background
router.post('/', upload(AWS_FOLDERS.LAYOUT_ASSETS).single('asset'), addAssetController);

//get all assets
router.get('/', getAllAssetsController);

//get assets by category
router.get('/:categoryId', getAssetByCategoryController);

//delete asset
router.delete('/:id', deleteAssetController);

//update asset
router.put('/:id', upload(AWS_FOLDERS.LAYOUT_ASSETS).single('asset'), updateAssetController);

export default router;
