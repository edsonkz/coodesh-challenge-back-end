import mongoose from "mongoose";

var Schema = mongoose.Schema;

const ArticleSchema = new Schema({
	id: Number,
	featured: Boolean,
	title: String,
	url: String,
	imageUrl: String,
	newsSite: String,
	summary: String,
	publishedAt: String,
	launches: [
		{
			id: String,
			provider: String,
		},
	],
	events: [
		{
			id: String,
			provider: String,
		},
	],
});
const Article = mongoose.model("Article", ArticleSchema);
export { Article };
