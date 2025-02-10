import { Router } from 'express';
import { AWS_FOLDERS } from '../../constants';
import upload from '../../utils/upload';
import {
  addAssetController,
  getAllAssetsController,
  getAssetByCategoryController,
} from './controller';

const router = Router();

// add background
router.post('/', upload(AWS_FOLDERS.LAYOUT_ASSETS).single('asset'), addAssetController);

//get all assets
router.get('/', getAllAssetsController);

//get assets by category
router.get('/:categoryId', getAssetByCategoryController);

export default router;
