import express from "express"
import { handleHelloWorld, handleUserPage, handleCreateNewUser, handleDeleteUser } from "../controller/homeController";

const router = express.Router();

const initWebRoutes = (app) => {
    router.get("/", handleHelloWorld);
    router.get("/user", handleUserPage);
    router.post("/user/create", handleCreateNewUser)
    router.post("/delete-user/:id", handleDeleteUser)

    return app.use("/", router);
}

export default initWebRoutes;