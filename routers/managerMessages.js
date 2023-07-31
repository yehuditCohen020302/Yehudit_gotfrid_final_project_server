const express =require('express')
const router= express.Router()
const managerMessagesController = require('../controllers/managerMessages');

router.post('/', managerMessagesController.sendMessage)
router.get('/', managerMessagesController.getAll)
router.delete('/:id', managerMessagesController.removeUserContact)

module.exports = router
