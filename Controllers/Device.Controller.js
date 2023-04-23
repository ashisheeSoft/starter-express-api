const { deviceRegistrationSchema,switchUpdateSchema } = require('../helpers/validation_schema');
const Device = require('../Models/Device.model');
const DeviceTypes = require('../Models/Types.model');

const createError = require('http-errors')
module.exports = {
    registerDevice: async (req, res, next) => {
        try {
            const result = await deviceRegistrationSchema.validateAsync(req.body);
            const doesDeviceExist = await Device.findOne({ deviceId: result.deviceId });
            if (doesDeviceExist)
                throw createError.Conflict(`${result.deviceId} is already been registered`)
            const typeData = await DeviceTypes.findOne({type:result.type});
            let switchData = typeData ? typeData.Relays.map((s)=>{
                return {
                  code: s,
                  name: s
                }
            }) : [];
            const deviceData = {
              userId: result.userId,
              deviceId: result.deviceId,
              deviceName: result.deviceName,
              switchValue: switchData
            }
            const device = new Device(deviceData);
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
      },
    updateSwitchName: async (req, res, next) => {
      try {
        console.log('here')
        const result = await switchUpdateSchema.validateAsync(req.body);
        const filter = {deviceId:result.deviceId,'switchValue.code':result.code};
        const update = { $set: { 'switchValue.$.name': result.name } }
        const deviceUpdate = await Device.findOneAndUpdate(filter,update,{new:true});
        if (!deviceUpdate)
              throw createError.Conflict(`No device Found for the user ${query.userId}`);
        res.send(deviceUpdate);
      } catch (error) {
        next(error)
      }
    }
}
