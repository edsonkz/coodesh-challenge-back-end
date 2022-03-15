import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

var Schema = mongoose.Schema;

const ArticleSchema = new Schema({
	id: { type: Number, immutable: true },
	featured: { type: Boolean, required: true },
	title: { type: String, required: true },
	url: { type: String, required: true },
	imageUrl: { type: String, required: true },
	newsSite: { type: String, required: true },
	summary: { type: String, required: isRequired },
	publishedAt: { type: String, required: true },
	launches: [
		{
			_id: false,
			id: String,
			provider: String,
		},
	],
	events: [
		{
			_id: false,
			id: String,
			provider: String,
		},
	],
	__v: { type: Number, select: false },
});

function isRequired() {
	return typeof this.summary === "string" ? false : true;
}

ArticleSchema.plugin(mongoosePaginate);

const Article = mongoose.model("Article", ArticleSchema);
export { Article };
