const express = require('express');
const router = express.Router();

const User = require('../../models/user')
const UserController = require('../../controllers/user');
const checkAuth = require('../../middleware/auth');

router.post("/signup", UserController.user_signup);

router.post("/login", UserController.user_login);

router.post("/new_entry", checkAuth, UserController.diary_create_entry);

router.post("/get_entries", checkAuth, UserController.diary_get_entries);

router.post("/delete_field/:fieldId", checkAuth, UserController.diary_delete_field);

router.post("/update_field/:fieldId", checkAuth, UserController.diary_update_field);

router.delete("/:userId", checkAuth, UserController.user_delete);

router.get("/profile", checkAuth, UserController.user_profile);

router.post("/logout", checkAuth, UserController.user_logout);

router.post("/logoutall", checkAuth, UserController.user_logout_all);




module.exports = router;