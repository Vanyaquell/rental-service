import { Router } from "express";
import upload from "../middleware/upload.js";
import { registration } from "../controllers/userController.js";
import { login } from "../controllers/userController.js";
import { logout } from "../controllers/userController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { checkAuth } from "../controllers/userController.js";

const router = new Router();

router.post('/register', upload.single('avatar'), registration);
router.delete('/logout', logout);
router.post('/login', login);
router.get('/login', authenticateToken, checkAuth);
export default router;