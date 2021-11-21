import { model, Schema } from 'mongoose';

const slotsSchema: Schema = new Schema({
    appoinment: Date,
    userId: {
        type: Schema.Types.ObjectId,
        default: null
    },
    oneDayNotification: {
        type: Boolean,
        default: false
    },
    twoHoursNotification: {
        type: Boolean,
        default: false
    }
});

const doctorSchema: Schema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    spec: {
        type: String,
        required: true
    },
    slots: [slotsSchema]
}, {
    timestamps: true
});

const doctorModel = model("Doctor", doctorSchema);
export default doctorModel;