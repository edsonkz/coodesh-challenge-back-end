import { Article } from "../models/article";
import path from "path";

class ArticleController {
    async index(req, res) {
        const url = path.join(path.resolve(), 'src/', 'template/', "index.html");
        return res.status(200).sendFile(url);
    }

    async create(req, res) {
        let newArticle = new Article(req.body);
        try {
            await newArticle.save();
            return res.send({
                message: "New article succussefully created." + newArticle._id,
            });
        } catch (error) {
            console.log("Error", error);
            return res.status(404).send({ name: error.name, error: error.message, });
        }
    }

    async findOne(req, res) {
        let { id } = req.params;
        try {
            const article = await Article.findOne({ id }, { _id: 0 });
            if (article === null || article.length <= 0) {
                return res.send({ message: "Couldn't find a article with that id." });
            } else {
                return res.send(article);
            }
        } catch (error) {
            console.log("Error", error);
            return res.status(404).send({ error });
        }
    }

    async findAll(req, res) {
        try {
            const articles = await Article.find({}, { _id: 0 });
            return res.status(200).send(articles);
        } catch (error) {

        }
    }

    async update(req, res) {
        let { id } = req.params;
        try {
            //check if Article exists.
            let article = await Article.findOne({ id });
            console.log("--------------------->", article);
            if (article === null || article.length <= 0)
                return res.send({ message: "Couldn't find a article with that id." });
            article = await Article.updateOne({ id }, req.body);
            return res.send(article);

        } catch (error) {
            console.log("Error", error);
        }
    }

    async delete(req, res) {
        let { id } = req.params;
        try {
            //check if Article exists.
            let article = await Article.findOne({ id });
            console.log("--------------------->", article);
            if (article === null || article.length <= 0) {
                return res.send({ message: "Couldn't find a article with that id." });
            } else {
                article = await Article.deleteOne({ id });
                return res.send({ message: `Article with id ${id} successfully deleted.` });
            }
        } catch (error) {
            console.log("Error", error);
        }
    }
}

export { ArticleController };