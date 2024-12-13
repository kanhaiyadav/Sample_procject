import { Router } from "express";
const router = Router();

import userRouter from "./userRouter.js";
import todoRouter from "./todoRouter.js";

router.use("/todo", todoRouter);
router.use("/user", userRouter);

export default router;
