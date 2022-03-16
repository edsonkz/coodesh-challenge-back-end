import cron from "node-cron";
import express from "express";
import { api } from "../service/api";
import { url, mongo, connectionParams } from "../database/db";
import { Article } from "../models/article";

const app = express();

async function create(article) {
	const articleExists = await Article.findOne({ id: article.id }, { _id: 0 });
	if (articleExists === null || articleExists.length <= 0) {
		let newArticle = new Article(article);
		await newArticle.save();
	} else console.log("Article already exists.");
}

async function main() {
	let startAt = 0;
	const latestArticle = await Article.find({}, "-_id publishedAt ")
		.lean()
		.sort({ publishedAt: -1 })
		.limit(1);
	var publishedAt = latestArticle[0].publishedAt;
	console.log(publishedAt);

	while (true) {
		let newArticles = (
			await api.get("articles", {
				params: {
					publishedAt_gt: publishedAt,
					_limit: 1000,
					_sort: "publishedAt",
					_start: startAt,
				},
			})
		).data;

		if (newArticles === null || newArticles.length <= 0) {
			break;
		}
		console.log(newArticles);
		for (var article of newArticles) {
			article.oldId = article.id;
			await create(article);
		}
		startAt += newArticles.length;
	}
}

cron.schedule(
	"0 9 * * *",
	async () => {
		var date = new Date().toLocaleTimeString();
		console.log("Cron executing. Time: " + date);
		mongo
			.connect(url, connectionParams)
			.then(async () => {
				console.log("Connected to database ");
				await main();
				mongo.connection.close();
			})
			.catch((err) => {
				console.error(`Error connecting to the database. \n${err}`);
			});
	},
	{
		scheduled: true,
		timezone: "America/Sao_Paulo",
	}
);

app.listen(1314);
