const { deviceRegistrationSchema } = require('../helpers/validation_schema');
const Device = require('../Models/Device.model');

const createError = require('http-errors')
module.exports = {
    registerDevice: async (req, res, next) => {
        try {
            const result = await deviceRegistrationSchema.validateAsync(req.body);
            const doesDeviceExist = await Device.findOne({ deviceId: result.deviceId });
            if (doesDeviceExist)
                throw createError.Conflict(`${result.deviceId} is already been registered`)
            const device = new Device(result);
            const saveDevice = await device.save();
            if(saveDevice)
            res.send({ isSaved: true });
            else
            res.send({ isSaved: false });
        } catch (error) {
          next(error)
        }
      },
      getDevices: async (req, res, next) => {
        try {
          let  query = req.query;
          const deviceList = await Device.find({userId:query.userId});
          if (!deviceList)
                throw createError.Conflict(`No device Found for the user ${query.userId}`);
          res.send({devices:deviceList});
        } catch (error) {
          next(error)
        }
      }
}
