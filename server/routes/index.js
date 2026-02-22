import { Router } from "express";
import offerRouter from './offerRoutes.js';
import userRouter from './userRoutes.js';
import reviewRouter from './reviewRoutes.js';


const router = new Router();

router.use('/comments', reviewRouter);
router.use('/', offerRouter);
router.use('/', userRouter);
export { router };