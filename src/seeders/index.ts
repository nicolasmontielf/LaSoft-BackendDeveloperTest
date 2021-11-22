import dotenv from "dotenv"
import connectToMongoDB from "../database/connection"
import User from "../models/User"
import Doctor from "../models/Doctor"
import moment from "moment"
const faker = require("faker")

dotenv.config()
connectToMongoDB()

const createUser = async () => {
    const newUser = new User({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        phone: faker.phone.phoneNumber(),
        email: faker.internet.email()
    })

    await newUser.save()

    console.log("New user created.")
}

const createDoctor = async () => {
    const nuevoDoctor = new Doctor({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        spec: faker.name.jobTitle(),
        slots: createAppoinments()
    })

    await nuevoDoctor.save()

    console.log("New doctor created.")
}

const createAppoinments = () => {
    const arr = [];
    const todayDate = moment.utc().format("YYYY-MM-DD HH:mm:ss")
    const oneWeekLaterDate = moment.utc().add(7, 'days').format("YYYY-MM-DD HH:mm:ss");

    for (let i = 0; i <= 12; i++) {
        arr.push({
            appoinment: moment
                .utc(faker.date.between(todayDate, oneWeekLaterDate))
                .startOf("hour")
                .format(),
            oneDayNotification: false,
            twoHoursNotification: false
        })
    }
    return arr;
}

async function main() {    
    for (let i = 0; i <= 5; i++) {
        await createDoctor();
        if (i <= 3) 
            await createUser()
    }
    console.log("Seeder over successfully!")
    process.exit()
}

main();