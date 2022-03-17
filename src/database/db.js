import mongoose from "mongoose";
import { config } from "dotenv";
config();


const mongo = mongoose;
var url = null;
if (process.env.MONGO_DATABASE === "prod") {
    url = process.env.MONGODB_URL;

} else {
    url = process.env.MONGODB_URL_MOCK;
}

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

export { url, mongo, connectionParams };