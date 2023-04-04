const express = require('express')
const router = express.Router()

const DeviceController = require('../Controllers/Device.Controller')

router.post('/register', DeviceController.registerDevice)

router.post('/devices', DeviceController.getDevices)
module.exports = router