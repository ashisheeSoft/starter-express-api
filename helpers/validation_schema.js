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

const deviceRegistrationSchema = Joi.object({
  deviceId: Joi.string().required(),
  deviceName: Joi.string().required(),
  userId: Joi.string().required(),
  type: Joi.string().required()
})

const switchUpdateSchema = Joi.object({
  deviceId: Joi.string().required(),
  code: Joi.string().required(),
  name: Joi.string().required()
})

const messageSchema = Joi.object({
  deviceId: Joi.string().required(),
  relayId: Joi.string().required(),
  code: Joi.string().required(),
})

module.exports = {
  authSchema,
  loginSchema,
  mobileOtpVerifySchema,
  deviceRegistrationSchema,
  switchUpdateSchema,
  messageSchema
}