import express from "express"
import { handleHelloWorld, handleUser } from "../controller/homeController";

const router = express.Router();

const initWebRoutes = (app) => {
    router.get("/", handleHelloWorld);
    router.get("/user", handleUser);

    return app.use("/", router);
}

export default initWebRoutes;