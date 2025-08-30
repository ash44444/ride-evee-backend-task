const express = require("express");
const { getUsers, getUser, createUser, updateUser, deleteUser } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", protect, createUser);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);

module.exports = router;
