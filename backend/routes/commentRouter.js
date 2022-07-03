import auth from "../middleware/auth.js";
import { Router } from "express";
const router = Router();
import commentCtrl from "../controllers/commentCtrl.js";

router.post("/comment", auth, commentCtrl.createComment);

router.patch("/comment/:id", auth, commentCtrl.updateComment);

router.patch("/comment/:id/like", auth, commentCtrl.likeComment);

router.patch("/comment/:id/unlike", auth, commentCtrl.unLikeComment);

router.delete("/comment/:id", auth, commentCtrl.deleteComment);

export default router;
