import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";
import { getUsers, getUser, updateUser, deleteUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/", authMiddleware, roleMiddleware(["admin"]), getUsers);
router.get("/:id", authMiddleware, getUser);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), deleteUser);

export default router;
