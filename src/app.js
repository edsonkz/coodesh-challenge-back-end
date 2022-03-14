import express from "express";
import { url, mongo, connectionParams } from "./database/db"
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

export { app };