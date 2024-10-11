import express from "express"
import homeController from "../controller/homeController"
import apiController from "../controller/apiController"

const router = express.Router();

const initWebRoutes = (app) => {
    router.get("/", homeController.handleHelloWorld);
    router.get("/users", homeController.handleUserPage);
    router.post("/users/create", homeController.handleCreateNewUser);
    router.post("/delete-user/:id", homeController.handleDeleteUser);
    router.get("/update-user/:id", homeController.getUpdateUserPage);
    router.post("/users/update-user", homeController.handleUpdateUser);

    router.get("/api/test-api", apiController.testApi);

    return app.use("/", router);
}   

export default initWebRoutes;