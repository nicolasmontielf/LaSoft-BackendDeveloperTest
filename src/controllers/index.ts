import { Request, Response } from "express";
import Doctor from "../models/Doctor";
import User from "../models/User";
import moment from "moment"

export const index = async (_: Request, res: Response): Promise<void> => {
    res.send({
        "test": "It works!"
    })
};

export const reservar = async (req: Request, res: Response|any): Promise<void> => {
    const userId = req.body.user_id;
    const doctorId = req.body.doctor_id;
    const utcDate = moment.utc(req.body.slot).format()
    
    try {
        // Check if doctor exists.
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.response(200, false, "Doctor not found", {});
        }

        // Check if user exists.
        const user = await User.findById(userId);
        if (!user) {
            return res.response(200, false, "User not found", {});
        }
        
        // Check if the doctor has the slot
        const indexAppoinment = doctor.slots.findIndex((slot: any) => {
            return moment(slot.appoinment).isSame(utcDate)
        })
        if (indexAppoinment === -1) {
            return res.response(200, false, "Doctor doesn't have a slot in that date", {});
        }

        // Check if the date is already taken
        if (doctor.slots[indexAppoinment].userId) {
            return res.response(200, false, "Sorry, that date is already taken", {});
        }

        // Now, we add the userId in the slot, to know that the appointment is taken
        doctor.slots[indexAppoinment].userId = userId;
        await doctor.save()
        
        return res.response(200, true, "The appointment was scheduled successfully!", {});

    } catch (error) {
        console.log("Error in reservar() function");
        return res.response(500, false, error.message, error);
    }
}