const createError = require('http-errors')
const User = require('../Models/User.model')
const { authSchema, loginSchema, mobileOtpVerifySchema } = require('../helpers/validation_schema')
const {
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken,
  } = require('../helpers/jwt_helper')


  module.exports = {
    register: async (req, res, next) => {
      try {
        // const { email, password } = req.body
        // if (!email || !password) throw createError.BadRequest()
        const result = await authSchema.validateAsync(req.body)

        result.mobileOtp = 9999;
        result.emailOtp = 9999;
  
        const doesEmailExist = await User.findOne({ email: result.email })
        if (doesEmailExist)
          throw createError.Conflict(`${result.email} is already been registered`)

        const doesMobileExist = await User.findOne({ mobile: result.mobile })
        if (doesMobileExist)
          throw createError.Conflict(`${result.mobile} is already been registered`)
  
        const user = new User(result)
        const savedUser = await user.save()
        const accessToken = await signAccessToken(savedUser.id)
        const refreshToken = await signRefreshToken(savedUser.id)
  
        res.send({ accessToken, refreshToken })
      } catch (error) {
        if (error.isJoi === true) error.status = 422
        next(error)
      }
    },
  
    login: async (req, res, next) => {
      try {
        const result = await loginSchema.validateAsync(req.body)
        const user = await User.findOne({ mobile: result.mobile })
        if (!user) throw createError.NotFound('User not registered')
  
        const isMatch = await user.isValidPassword(result.password)
        if (!isMatch)
          throw createError.Unauthorized('mobile number/password not valid')
  
        const accessToken = await signAccessToken(user.id)
        const refreshToken = await signRefreshToken(user.id)
  
        res.send({ accessToken, refreshToken })
      } catch (error) {
        if (error.isJoi === true)
          return next(createError.BadRequest('Invalid Username/Password'))
        next(error)
      }
    },

    verifyMobileOtp: async (req, res, next) => {

      try {

      const result = await mobileOtpVerifySchema.validateAsync(req.body)

      const data = await User.findById(req.payload.aud);

      console.log(result.mobileOtp)
      console.log(parseInt(data.mobileOtp))

      if(parseInt(data.mobileOtp) === result.mobileOtp){

        await User.findByIdAndUpdate(req.payload.aud, {active: true});

        res.send({ 
          status: true,
          message: 'Mobie OTP has been verified!'
         })
      }else{
         res.status(400).json({
          status: false,
          message: 'Mobie OTP is wrong!'
      });
      }

    } catch (error) {
      if (error.isJoi === true)
        return next(createError.BadRequest('something went wrong!'))
      next(error)
    }

    },

    resendMobileOtp: async (req, res, next) => {

      try {

        mobileOtp = 6666;

        await User.findByIdAndUpdate(req.payload.aud, {mobileOtp: mobileOtp});

        res.send({ 
          status: true,
          message: 'Mobie OTP has been sent!'
         })

    } catch (error) {
      if (error.isJoi === true)
        return next(createError.BadRequest('something went wrong!'))
      next(error)
    }

    },
  
    refreshToken: async (req, res, next) => {
      try {
        const { refreshToken } = req.body
        if (!refreshToken) throw createError.BadRequest()
        const userId = await verifyRefreshToken(refreshToken)
  
        const accessToken = await signAccessToken(userId)
        const refToken = await signRefreshToken(userId)
        res.send({ accessToken: accessToken, refreshToken: refToken })
      } catch (error) {
        next(error)
      }
    },
  
    logout: async (req, res, next) => {
      try {
        const { refreshToken } = req.body
        if (!refreshToken) throw createError.BadRequest()
        const userId = await verifyRefreshToken(refreshToken)
        client.DEL(userId, (err, val) => {
          if (err) {
            console.log(err.message)
            throw createError.InternalServerError()
          }
          console.log(val)
          res.sendStatus(204)
        })
      } catch (error) {
        next(error)
      }
    },
  }