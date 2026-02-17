import { Router } from "express";
import offerRouter from './offerRoutes.js';
import userRouter from './userRoutes.js';


const router = new Router();

router.use('/', offerRouter);
router.use('/', userRouter);
export { router }