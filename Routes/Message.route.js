const express = require('express')
const router = express.Router()

const MessageController = require('../Controllers/Message.Controller')

router.post('/sendMessage', MessageController.sendMessageTodevice)
module.exports = router
