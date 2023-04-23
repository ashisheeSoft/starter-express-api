const express = require('express')
const router = express.Router()

const DeviceController = require('../Controllers/Device.Controller')

router.post('/register', DeviceController.registerDevice)

router.get('/devices', DeviceController.getDevices)
router.post('/updateswitch',DeviceController.updateSwitchName)
module.exports = router
