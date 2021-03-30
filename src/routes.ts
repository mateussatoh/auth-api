import { Router } from "express";

import AuthMiddleware from "./app/middlewares/AuthMiddleware";

import AuthController from "./app/controllers/AuthController";
import UserController from "./app/controllers/UserController";

const router = Router();

router.post("/users", UserController.store);
router.post("/auth", AuthController.authenticate);
router.get("/users", AuthMiddleware, UserController.index);
router.delete("/users", UserController.delete);

export default router;
