const express = require('express')
const router = express.Router()
const diaryController = require('../controllers/diary')

router.post('/', diaryController.addFoodToDiary)
router.get('/:id', diaryController.getDiaryByUser)

module.exports = router

