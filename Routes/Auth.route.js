const express = require('express')
const router = express.Router()
const {
    verifyAccessToken
  } = require('../helpers/jwt_helper')

const AuthController = require('../Controllers/Auth.Controller')

router.post('/register', AuthController.register)

router.post('/login', AuthController.login)

router.post('/verifyotp', verifyAccessToken, AuthController.verifyMobileOtp)

router.post('/resendmobileotp', verifyAccessToken, AuthController.resendMobileOtp)

router.post('/refresh-token', AuthController.refreshToken)

router.delete('/logout', AuthController.logout)

module.exports = router