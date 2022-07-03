import auth from "../middleware/auth.js";
import { Router } from "express";
const router = Router();
import messageCtrl from "../controllers/messageCtrl.js";

router.post("/message", auth, messageCtrl.createMessage);

router.get("/conversations", auth, messageCtrl.getConversations);

router.get("/message/:id", auth, messageCtrl.getMessages);

router.delete("/message/:id", auth, messageCtrl.deleteMessages);

router.delete("/conversation/:id", auth, messageCtrl.deleteConversation);

export default router;
