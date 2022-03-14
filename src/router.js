import { Router } from "express";
import { ArticleController } from "./controllers/ArticleController";

const router = Router();

const articleController = new ArticleController();

router.get("/", articleController.index);
router.get("/articles/:id", articleController.findOne);
router.post("/articles", articleController.create);

export { router };
