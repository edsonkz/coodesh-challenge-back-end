import express from "express";
import { url, mongo, connectionParams } from "./database/db"
import mongoSequence from "mongoose-sequence";
import { router } from "./router";

const app = express();
mongo.connect(url, connectionParams)
    .then(() => {
        console.log('Connected to database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

app.use(express.json());
app.use(router);
process.on('SIGINT', function(params) {
    mongo.disconnect()
    console.log("Finishing application...")
    process.exit(1)
});
export { app };