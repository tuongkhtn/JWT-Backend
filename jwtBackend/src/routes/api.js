import express from "express"
import apiController from "../controller/apiController"
import userController from "../controller/userController"
import groupController from "../controller/groupController"
import { checkUserJWT, checkUserPermission } from "../middleware/JWTAction"

const router = express.Router();

const testMiddleware = (req, res, next) => {
    console.log("Test middleware");
    next();
}

const initApiRoutes = (app) => {    
    router.get("/test-api", apiController.testApi);
    router.post("/register", apiController.handleRegister)
    router.post("/login", apiController.handleLogin)

    router.get("/users/read", checkUserJWT, checkUserPermission, userController.getUsers);
    router.get("/users/read/:id", userController.getUserById);
    router.delete("/users/delete", userController.deleteUserById);
    router.post("/users/create", userController.createNewUser);
    router.put("/users/update", userController.updateUserById)

    router.get("/groups/read", groupController.getGroupName);

    return app.use("/api/v1", router);
}   

export default initApiRoutes;