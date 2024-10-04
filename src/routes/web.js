import express from "express"
import { handleHelloWorld, handleUserPage, handleCreateNewUser } from "../controller/homeController";

const router = express.Router();

const initWebRoutes = (app) => {
    router.get("/", handleHelloWorld);
    router.get("/user", handleUserPage);
    router.post("/user/create", handleCreateNewUser)

    return app.use("/", router);
}

export default initWebRoutes;