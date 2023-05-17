const { messageSchema } = require('../helpers/validation_schema');
const createError = require('http-errors')
const mqtt = require('mqtt');
const {sendMessageTodevice} = require('../helpers/init_mqtt');
module.exports = {
    sendMessageTodevice: async (req, res, next) => {
        const result = await messageSchema.validateAsync(req.body);
        try {  
            sendMessageTodevice(result.deviceId,result.code)
            res.send({message:"send"})
        } catch (error) {
          next(error)
        }
      }
}
