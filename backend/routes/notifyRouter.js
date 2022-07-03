import auth from "../middleware/auth.js";
import { Router } from "express";
const router = Router();
import notifyCtrl from "../controllers/notifyCtrl.js";

router.post("/notify", auth, notifyCtrl.createNotify);

router.delete("/notify/:id", auth, notifyCtrl.removeNotify);

router.get("/notifies", auth, notifyCtrl.getNotifications);

router.patch("/isReadNotify/:id", auth, notifyCtrl.isReadNotify);

router.delete("/deleteAllNotify", auth, notifyCtrl.deleteAllNotifications);

export default router;
