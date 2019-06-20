const express = require('express');
const router = express.Router();

const UserController = require('../../controllers/user');
const checkAuth = require('../../middleware/check-auth');

router.post("/signup", UserController.user_signup);

router.post("/login", UserController.user_login);

router.post("/new_entry", UserController.diary_create_entry);

router.post("/get_entries", UserController.diary_get_entries);

router.post("/delete_field", UserController.diary_delete_field);

router.delete("/:userId", checkAuth, UserController.user_delete);

module.exports = router;