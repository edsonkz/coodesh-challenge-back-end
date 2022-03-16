import mongoose from "mongoose";
import { config } from "dotenv";
config();


const mongo = mongoose;
const url = `mongodb+srv://adminEd:${process.env.MONGODB_PASSWORD}@cluster0.86zxy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

export { url, mongo, connectionParams };