import bcrypt from "bcrypt"
import mysql from "mysql2"
require('dotenv').config()

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

const hashUserPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    let hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword
}

const createNewUser = (email, username, password) => {
    let hashPassword = hashUserPassword(password);

    connection.query(
        "INSERT INTO USERS (EMAIL, NAME, PASSWORD) VALUES (?, ?, ?)", [email, username, hashPassword],
        function (err, results, fields) {
            console.log(results);
            console.log(fields);
        }
    )
}

const getUserList = () => {
    connection.query(
        "SELECT * FROM USERS",
        function (err, results, fields) {
            console.log(results);
            console.log(fields);
        }
    )
}

module.exports = {
    hashUserPassword,
    createNewUser,
    getUserList,
}