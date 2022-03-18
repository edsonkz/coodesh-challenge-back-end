import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import AutoIncrementFactory from "mongoose-sequence";

const autoIncrement = AutoIncrementFactory(mongoose);

var Schema = mongoose.Schema;

const ArticleSchema = new Schema({
	id: { type: Number, immutable: true, unique: true },
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
	oldId: { type: Number, required: false, unique: false, immutable: true },
});

function isRequired() {
	return typeof this.summary === "string" ? false : true;
}

ArticleSchema.index({ publishedAt: 1 });

ArticleSchema.plugin(mongoosePaginate);
ArticleSchema.plugin(autoIncrement, { inc_field: "id" });

const Article = mongoose.model("Article", ArticleSchema);
export { Article };
