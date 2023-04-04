const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

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
        default: true,
    },
},
    {
        timestamps: true,
    })



const Device = mongoose.model('devices', DeviceSchema)
module.exports = Device