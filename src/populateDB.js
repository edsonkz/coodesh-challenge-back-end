import { Article } from "./models/article";
import axios from "axios";
import { url, mongo, connectionParams } from "./database/db";

const apiUrl = "https://api.spaceflightnewsapi.net/v3/";
var startArticles = 0;
const api = axios.create({
    baseURL: apiUrl,
});

mongo
    .connect(url, connectionParams)
    .then(async(mongox) => {
        console.log("Connected to database ");
        await main();
        mongo.connection.close();
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    });


async function create(article) {
    let newArticle = new Article(article);
    await newArticle.save();
}

async function main() {
    try {
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
        const total = (await api.get("articles/count")).data;
        console.log(total);
        while (startArticles < total) {
            var { data } = await api.get("articles", {
                params: { _start: startArticles, _limit: 1000, _sort: "publishedAt" },
            });

            for (var article of data) {
                article.oldId = article.id;
                await create(article);
            }

            startArticles += data.length;
            // console.log(articles.length);
            // console.log(startArticles);
            if (startArticles % 3000 === 0) {
                await delay(10000);
            }
        }

        console.log("-----------", startArticles, "-------------");

        return;
    } catch (error) {
        console.log(error);
        return true;
    }
}