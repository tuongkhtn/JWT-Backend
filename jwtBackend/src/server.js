import express from "express";
import configViewEngine from "./config/viewEngine";
import configCors from "./config/cors"
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api"
import bodyParser from "body-parser"
import connection from "./config/connectDB"
require("dotenv").config()

import { createToken, verifyToken } from "./middleware/JWTAction"

const app = express();


// config cors
configCors(app);

// test jwt
createToken();
let decoded = verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidHVvbmciLCJhZGRyZXNzIjoicXVhbmcgbmFtIiwiaWF0IjoxNzI5MzMzMDY5fQ.5gvW7mwGaKUCmXleGeuVkQcKdlHd8xqXCbe33DS4loI")
console.log(decoded)

// config view engine
configViewEngine(app);

// config body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// test connection db
connection();

// init web routes
initWebRoutes(app);
initApiRoutes(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is starting at ${PORT}`)
})
