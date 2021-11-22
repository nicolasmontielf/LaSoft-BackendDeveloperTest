import { Router } from "express";
import * as controller from "../controllers";

const router = Router();

router.get("/", controller.index);
router.get("/socket.io", () => console.log("Connected with Socket.io")) // Just for a local bug
router.post("/new-appointment", controller.reservar)

export default router;