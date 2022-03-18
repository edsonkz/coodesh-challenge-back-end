import test from "tape";
import supertest from "supertest";
import { app } from "../app";
import { Article } from "../models/article";
import mongoose from "mongoose";

test("GET / get index page", (t) => {
	supertest(app)
		.get("/")
		.expect("Content-Type", /html/)
		.expect(200)
		.end((err, res) => {
			//console.log(res.status);
			//t.error(err, 'Sem erros')
			t.assert(res.status === 200, "Get index Page.");
			t.end();
		});
});

test("POST /articles/ create new article", (t) => {
	supertest(app)
		.post("/articles/")
		.send({
			title: "SpaceX rapidly stacks Starship and Super Heavy with ‘Mechazilla’",
			url: "https://www.teslarati.com/spacex-starship-super-heavy-full-stack-round-three/",
			imageUrl:
				"https://www.teslarati.com/wp-content/uploads/2022/03/Starbase-031522-NASASpaceflight-B4-S20-stack-3-feature-1-c.jpg",
			newsSite: "Teslarati",
			summary:
				"For the second time ever, SpaceX has used Starbase’s ‘Mechazilla’ tower and arms to stack a Starship upper stage on top of...",
			publishedAt: "2022-03-16T11:08:23.000Z",
			updatedAt: "2022-03-16T11:08:32.264Z",
			featured: false,
			launches: [],
			events: [],
		})
		.expect("Content-Type", /json/)
		.expect(200)
		.end((err, res) => {
			//console.log(res.body)
			//t.error(err, 'Sem erros')
			t.assert(res.body.message, "Article Created.");
			t.end();
		});
});

test("POST /articles/ create new article not having all required params", (t) => {
	supertest(app)
		.post("/articles/")
		.send({
			title: "SpaceX rapidly stacks Starship and Super Heavy with ‘Mechazilla’",
			url: "https://www.teslarati.com/spacex-starship-super-heavy-full-stack-round-three/",
			imageUrl:
				"https://www.teslarati.com/wp-content/uploads/2022/03/Starbase-031522-NASASpaceflight-B4-S20-stack-3-feature-1-c.jpg",
			newsSite: "Teslarati",
			summary:
				"For the second time ever, SpaceX has used Starbase’s ‘Mechazilla’ tower and arms to stack a Starship upper stage on top of...",
			updatedAt: "2022-03-16T11:08:32.264Z",
			featured: false,
			launches: [],
			events: [],
		})
		.expect("Content-Type", /json/)
		.expect(200)
		.end((err, res) => {
			//console.log(res.body)
			//t.error(err, 'Sem erros')
			t.assert(res.body.error, "Article Failed to be Created.");
			t.end();
		});
});

test("UPDATE /articles/ update article", (t) => {
	supertest(app)
		.put("/articles/1")
		.send({
			title: "Testing",
		})
		.expect("Content-Type", /json/)
		.expect(200)
		.end((err, res) => {
			//console.log(res.body)
			//t.error(err, 'Sem erros')
			t.assert(res.body.acknowledged, "Article Updated.");
			t.end();
		});
});

test("UPDATE /articles/ update non-existent article", (t) => {
	supertest(app)
		.put("/articles/9999999")
		.send({
			title: "Testing",
		})
		.expect("Content-Type", /json/)
		.expect(200)
		.end((err, res) => {
			//console.log(res.body)
			//t.error(err, 'Sem erros')
			t.assert(
				res.body.message,
				"non-existent Article cannot be Updated."
			);
			t.end();
		});
});

test("UPDATE /articles/ update immutable article param", (t) => {
	supertest(app)
		.put("/articles/1")
		.send({
			id: 99999,
		})
		.expect("Content-Type", /json/)
		.expect(200)
		.end((err, res) => {
			//console.log(res.body)
			//t.error(err, 'Sem erros')
			t.assert(!res.body.acknowledged, "Article Not Updated.");
			t.end();
		});
});

test("GET /articles/id existent id", (t) => {
	supertest(app)
		.get("/articles/1")
		.expect("Content-Type", /json/)
		.expect(200)
		.end((err, res) => {
			//console.log(res.body)
			//t.error(err, 'Sem erros')
			t.assert(res.body.title, "Article Found.");
			t.end();
		});
});

test("GET /articles/id non-existent id", (t) => {
	supertest(app)
		.get("/articles/9999999")
		.expect("Content-Type", /json/)
		.expect(200)
		.end((err, res) => {
			//console.log(res.body)
			//t.error(err, 'Sem erros')
			t.assert(res.body.message, "Article not Found.");
			t.end();
		});
});

test("GET /articles/ find all articles", (t) => {
	supertest(app)
		.get("/articles")
		.expect("Content-Type", /json/)
		.expect(200)
		.end((err, res) => {
			//console.log(res.body.articles)
			//t.error(err, 'Sem erros')
			t.assert(typeof res.body.articles === "object", "Articles Found.");
			t.end();
		});
});

test("GET /articles/ invalid pagination for articles", (t) => {
	supertest(app)
		.get("/articles?page=100000")
		.expect("Content-Type", /json/)
		.expect(200)
		.end((err, res) => {
			//console.log(typeof res.body.articles)
			//t.error(err, 'Sem erros')
			t.assert(
				typeof res.body.articles !== "object",
				"Invalide Page for Articles."
			);
			t.end();
		});
});

test("DELETE /articles/id delete existent id", (t) => {
	supertest(app)
		.delete("/articles/1")
		.expect("Content-Type", /json/)
		.expect(200)
		.end((err, res) => {
			//console.log(res.body)
			//t.error(err, 'Sem erros')
			t.assert(res.body.message, "Article Deleted.");
			t.end();
		});
});

test("DELETE /articles/id delete non-existent id", (t) => {
	supertest(app)
		.delete("/articles/1")
		.expect("Content-Type", /json/)
		.expect(200)
		.end((err, res) => {
			//console.log(res.body)
			//t.error(err, 'Sem erros')
			t.assert(
				res.body.message,
				"non-existing Article cannot be Deleted."
			);
			t.end();
		});
});

test.onFinish(async () => {
	await Article.counterReset("id", (err) => null);
	mongoose.connection.close();
});
