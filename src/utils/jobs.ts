const cron = require('node-cron');
import moment from "moment"
import Doctor from "../models/Doctor"
import User from "../models/User"
import fs from "fs";

const main = () => {
    console.log(`The Job is started at ${moment().format("HH:mm:ss")}!`)

    cron.schedule('*/30 * * * *', async () => {
        const oneDayFormated = moment.utc().add(1, "d").format()
        const oneDay = moment.utc().add(1, "d");
        const twoHours = moment.utc().add(2, "h");
        
        const doctors = await Doctor.find(
            { "slots.appointment": { $lte: oneDayFormated } }
        );

        for (let doctor of doctors) {
            let newsSlots = doctor.slots.map((slot: any) => {
                if (slot.userId) {
                    if (moment.utc(slot.appointment) <= twoHours && !slot.twoHoursNotification) {
                        generateNotification(slot.userId, "2h", doctor, slot);
                        slot.twoHoursNotification = true;
                    } else if (moment.utc(slot.appointment) <= oneDay && !slot.oneDayNotification) {
                        generateNotification(slot.userId, "1d", doctor, slot);
                        slot.oneDayNotification = true;
                    }
                }
                return slot;
            })
            
            doctor.slots = newsSlots;
            await doctor.save()
        }
    });

    console.log(`The Job is finished at ${moment().format("HH:mm:ss")}!`)
}

const generateNotification = async (userId: any, timeKey: string, doctor: any, slot: any) => {
    const user = await User.findById(userId);
    const actualDate = moment().format("YYYY-MM-DD HH:mm");
    const appointmentTime = moment.utc(slot.appointment).format("HH:mm") 

    let text = "";
    if (timeKey === "1d") {
        text = `${actualDate} | Hi ${user.firstName}! Remind you that you have an appointment to a ${doctor.spec} tomorrow at ${appointmentTime}`;
    } else if (timeKey === "2h") {
        text = `${actualDate} | Hi ${user.firstName}! In 2 hours you have appointment to ${doctor.spec} at ${appointmentTime}!`
    }

    fs.appendFile(
        `${__dirname}/../../src/logs/notifications.log`,
        text + "\n",
        function (err) {
            if (err)  {
                return console.error("Error writing notification file", err)
            }
            console.log('Notification sended correctly!');
        }
    );

}

export default main;