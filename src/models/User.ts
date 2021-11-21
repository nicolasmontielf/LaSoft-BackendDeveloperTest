import { model, Schema } from 'mongoose';

const userSchema: Schema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

const userModel = model("User", userSchema);
export default userModel;