import express from "express";
import homeController, { getHomePage, getABC } from "../controllers/homeController";
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', getHomePage);
    router.get('/abc', getABC);





    return app.use("/", router);
}

module.exports = initWebRoutes;