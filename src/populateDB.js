import { Article } from "./models/article";
import axios from "axios";
import { url, mongo, connectionParams } from "./database/db";

const apiUrl = "https://api.spaceflightnewsapi.net/v3/";
var startArticles = 0;
mongo
	.connect(url, connectionParams)
	.then(async (mongox) => {
		console.log("Connected to database ");
		await main();
		mongo.connection.close();
	})
	.catch((err) => {
		console.error(`Error connecting to the database. \n${err}`);
	});

const api = axios.create({
	baseURL: apiUrl,
});

async function main() {
	var articles = [];
	try {
		while (startArticles < 30) {
			var { data } = await api.get("articles", {
				params: { _start: startArticles },
			});
			articles.push.apply(articles, data);
			startArticles += data.length;
			console.log(articles.length);
			console.log(startArticles);
		}

		for (var i of articles) console.log(i.id);

		return;
	} catch (error) {
		console.log(error);
		return true;
	}
}
