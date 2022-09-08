const express = require("express");
const {
  handlerGetUsers,
  handlerGetUserById,
  handlerPostUser,
  handlerPutUser,
  handlerDeleteUser,
  handlerGetUserByFullName,
} = require("./handler");
const router = express.Router();

router.get("/", handlerGetUsers);
router.get("/search", handlerGetUserByFullName);
router.get("/:id", handlerGetUserById);
router.post("/", handlerPostUser);
router.put("/:id", handlerPutUser);
router.delete("/:id", handlerDeleteUser);

module.exports = router;
