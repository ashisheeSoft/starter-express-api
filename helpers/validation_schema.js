const Joi = require('joi')

const authSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  mobile: Joi.number().required(),
  password: Joi.string().min(8).required(),
})

const loginSchema = Joi.object({
  mobile: Joi.number().required(),
  password: Joi.string().min(8).required(),
})

const mobileOtpVerifySchema = Joi.object({
  mobileOtp: Joi.number().required(),
})

module.exports = {
  authSchema,
  loginSchema,
  mobileOtpVerifySchema,
}