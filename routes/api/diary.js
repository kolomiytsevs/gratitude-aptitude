const express = require('express')
const router = express.Router()

const DiaryController = require('../../controllers/diary')
const checkAuth = require('../../middleware/auth')

router.post("/new_entry", checkAuth, DiaryController.diary_create_entry) 

router.post("/get_entries", checkAuth, DiaryController.diary_get_entries) 

router.post("/delete_field/:fieldId", checkAuth, DiaryController.diary_delete_field) 

router.post("/update_field/:fieldId", checkAuth, DiaryController.diary_update_field) 

module.exports = router 