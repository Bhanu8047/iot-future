const mongoose = require('mongoose')


const appliancesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    props: [
        {
            name :{
                type: String,
                required: true,
                trim: true
            },
            value: {
                type: String,
                required: true,
                trim: true
            }
        }
    ],
    state: {
        type: Boolean,
        default: false
    },
    watt: {
        type: Number,
        required: true
    },
    unitsPerHour: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Appliance = mongoose.model('Appliances', appliancesSchema)

module.exports = Appliance