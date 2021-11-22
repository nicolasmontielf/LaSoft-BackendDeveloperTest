### Test for NodeJs Backend Developer

## How install
1. Clone the repository
2. Run `npm install` to install all the dependencies.
3. Copy the .env.example file to .env and add the URL from your MongoDB server.
4. Run `npm run dev`. This will transpyle the Typescript code to Javascript, also will connect with the database and run the server.
5. Run `npm run prefill` to install some data into de database (doctor, appointments and users). It will create slots from the actual date to the next week.

### API
The project has one endpoint, when you can make a new appointment for an user.
To test the endpoint, the url is {BASE_URL}/api/new-appointment, and the params are:
    - **user_id**
    - **doctor_id**
    - **slot** ( the prefference, the format need to be (YYYY-MM-DD HH:mm) )
    
### Notification Service
The project use the library `cronode-cron`, and basically it will consult the database every thirty minutes to send the notifications. This notifications are written in a file in the path "src/logs/notifications.log"

**THANK YOU!**