import { Router } from "express";
import {
  addBackgroundController,
  deleteBackgroundController,
  getAllBackgroundsController,
  updateBackgroundController,
} from "./controller";
import upload from "../../utils/upload";
import { AWS_FOLDERS } from '../../constants';

const router = Router();

// add background
router.post('/', upload(AWS_FOLDERS.BACKGROUNDS).single('background'), addBackgroundController);
// delete background
router.delete('/:id', deleteBackgroundController);
// get all backgrounds
router.get('/', getAllBackgroundsController);
//update background
router.put(
  '/:id',
  upload(AWS_FOLDERS.BACKGROUNDS).single('background'),
  updateBackgroundController
);

export default router;
