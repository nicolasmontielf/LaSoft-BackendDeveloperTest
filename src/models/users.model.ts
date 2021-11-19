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
    foods: [String]
}, {
    timestamps: true
});

const userModel = model("User", userSchema);
export default userModel;