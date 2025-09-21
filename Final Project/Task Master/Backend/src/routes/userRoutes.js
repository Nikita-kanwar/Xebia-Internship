const express = require("express");
const { getUsers, getUser, updateUser, deleteUser } = require("../controllers/userController");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.use(authMiddleware);
router.use(adminMiddleware);

router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
