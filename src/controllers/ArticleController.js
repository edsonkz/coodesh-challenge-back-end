import { Article } from "../models/article";
import path from "path";

class ArticleController {
	async index(req, res) {
		const url = path.join(
			path.resolve(),
			"src/",
			"template/",
			"index.html"
		);
		return res.status(200).sendFile(url);
	}

	async create(req, res) {
		let newArticle = new Article(req.body);
		try {
			console.log(typeof newArticle.summary);
			await newArticle.save();
			return res.send({
				message:
					"New article succussefully created. ID: " + newArticle.id,
			});
		} catch (error) {
			console.log("Error", error);
			return res
				.status(404)
				.send({ name: error.name, error: error.message });
		}
	}

	async findOne(req, res) {
		let { id } = req.params;
		try {
			const article = await Article.findOne({ id }, { _id: 0 });
			if (article === null || article.length <= 0) {
				return res.send({
					message: "Couldn't find a article with this id.",
				});
			} else {
				return res.send(article);
			}
		} catch (error) {
			console.log("Error", error);
			return res
				.status(404)
				.send({ name: error.name, error: error.message });
		}
	}

	async findAll(req, res) {
		const getPagination = (page, size) => {
			const limit = size ? +size : 5;
			const offset = page ? page * limit : 0;
			return { limit, offset };
		};

		const { page, size } = req.query;
		const { limit, offset } = getPagination(page, size);
		try {
			var articlesPage = await Article.paginate(
				{},
				{
					select: "-_id",
					offset,
					limit,
				}
			);

			if (articlesPage.docs === null || articlesPage.docs.length <= 0) {
				articlesPage.docs = "Invalid Page. Check total pages number.";
			}

			return res.status(200).send({
				totalItems: articlesPage.totalDocs,
				articles: articlesPage.docs,
				totalPages: articlesPage.totalPages,
				currentPage: articlesPage.page - 1,
			});
		} catch (error) {
			console.log("Error", error);
			return res
				.status(404)
				.send({ name: error.name, error: error.message });
		}
	}

	async update(req, res) {
		let { id } = req.params;
		try {
			//check if Article exists.
			let article = await Article.findOne({ id });
			if (article === null || article.length <= 0)
				return res.send({
					message: "Couldn't find a article with this id.",
				});
			article = await Article.updateOne({ id }, req.body);
			return res.send(article);
		} catch (error) {
			console.log("Error", error);
			return res
				.status(404)
				.send({ name: error.name, error: error.message });
		}
	}

	async delete(req, res) {
		let { id } = req.params;
		try {
			//check if Article exists.
			let article = await Article.findOne({ id });
			if (article === null || article.length <= 0) {
				return res.send({
					message: "Couldn't find a article with this id.",
				});
			} else {
				article = await Article.deleteOne({ id });
				return res.send({
					message: `Article with id ${id} successfully deleted.`,
				});
			}
		} catch (error) {
			console.log("Error", error);
			return res
				.status(404)
				.send({ name: error.name, error: error.message });
		}
	}
}

export { ArticleController };
