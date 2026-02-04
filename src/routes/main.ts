import { Router } from 'express';
import * as pingController from '../controllers/pingController';
import * as uploadController from '../controllers/uploadController';
import { upload } from '../libs/multerLib';


export const mainRouter = Router();

mainRouter.get('/ping', pingController.ping);

mainRouter.post('/upload', upload.single('arquivo'), uploadController.upload);