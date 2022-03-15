import mongoose from "mongoose";

var Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    id: { type: Number, immutable: true },
    featured: { type: Boolean, required: true },
    title: { type: String, required: true },
    url: { type: String, required: true },
    imageUrl: { type: String, required: true },
    newsSite: { type: String, required: true },
    summary: { type: String, required: false },
    publishedAt: { type: String, required: true },
    launches: [{
        id: String,
        provider: String,
    }, ],
    events: [{
        id: String,
        provider: String,
    }, ],
});
const Article = mongoose.model("Article", ArticleSchema);
export { Article };