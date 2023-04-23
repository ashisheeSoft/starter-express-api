const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DeviceSchema = new Schema({
    type: {
        type: String,
        required: true,
        unique: true,
    },
    noOfSwitches: {
        type: Number,
        required: true,
    },
    Relays: [{
        type: String,
        default: true,
    }],
},
{
    timestamps: true,
});



const DeviceTypes = mongoose.model('migro_device_types', DeviceSchema);
module.exports = DeviceTypes