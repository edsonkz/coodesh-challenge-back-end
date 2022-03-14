import { Article } from "../models/article";

class ArticleController {
	async index(req, res) {
		return res.send("Back-end Challenge 2021 - Space Flight News");
	}

	async create(req, res) {
		let newArticle = new Article(req.body);
		try {
			await newArticle.save();
			res.send({
				message: "New article succussefully created." + newArticle._id,
			});
		} catch (error) {
			console.log("Error", error);
		}
	}

	async findOne(req, res) {
		let { id } = req.params;
		try {
			const article = await Article.findOne({ id });
			return res.send(article);
		} catch (error) {
			console.log("Error", error);
		}
	}
}

export { ArticleController };
