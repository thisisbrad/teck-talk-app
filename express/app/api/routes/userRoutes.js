import { Router } from "express";
import { createUser, deleteUser, readAllUsers, readUser, updateUser } from "../controllers/userController.js";

const router = Router();

router.post("/", createUser);
router.get("/", readAllUsers);
router.get("/:id", readUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;