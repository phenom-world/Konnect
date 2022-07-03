import { Router } from "express";
const router = Router();
import authCtrl from "../controllers/authCtrl.js";

router.post("/register", authCtrl.register);

router.post("/login", authCtrl.login);

router.post("/logout", authCtrl.logout);

router.post("/refresh", authCtrl.generateRefreshToken);

export default router;
