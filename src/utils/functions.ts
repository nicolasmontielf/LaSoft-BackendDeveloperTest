import { Types } from 'mongoose';

export const checkValidId = (id: any) => {
    return Types.ObjectId.isValid(id)
}