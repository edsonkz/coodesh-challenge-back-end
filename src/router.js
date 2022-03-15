import { Router } from "express";
import { ArticleController } from "./controllers/ArticleController";

const router = Router();

const articleController = new ArticleController();

router.get("/", articleController.index);
router.get("/articles/:id", articleController.findOne);
router.get("/articles", articleController.findAll);
router.post("/articles", articleController.create);
router.put("/articles/:id", articleController.update);
router.delete("/articles/:id", articleController.delete);

export { router };