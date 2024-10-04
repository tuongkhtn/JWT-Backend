import mysql from "mysql2"
require('dotenv').config()

const handleHelloWorld = (req, res) => {
    return res.render("home.ejs");
}   

const handleUserPage = (req, res) => {
    return res.render("user.ejs")
}

const handleCreateNewUser = (req, res) => {
    let {email, username, password} = req.body;

    console.log({email, username, password} )

    const connection = mysql.createPool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    })

    connection.query(
        "INSERT INTO USERS (EMAIL, NAME, PASSWORD) VALUES (?, ?, ?)", [email, username, password],
        function (err, results, fields) {
            console.log(results);
            console.log(fields);
        }
    )

    return res.send("handleCreateUser")
}

module.exports = {
    handleHelloWorld,
    handleUserPage,
    handleCreateNewUser,
}