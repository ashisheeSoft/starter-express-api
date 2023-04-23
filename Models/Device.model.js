const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DeviceSchema = new Schema({
    userId: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    deviceId: {
        type: String,
        required: true,
    },
    deviceName: {
        type: String,
        required: true,
    },
    switchValue: [
        {
            code:{type:String,required:true},
            name:{type:String,required:true}
        }
    ]
},
{
    timestamps: true,
});



const Device = mongoose.model('devices', DeviceSchema)
module.exports = Device