import bcrypt from "bcrypt"
import mysql from "mysql2/promise"
require('dotenv').config()

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

const getUserList = async () => {
    let users = []

    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    })

    try {
        const [results, fields] = await connection.query(
          'SELECT * FROM USERS'
        );
      
        users = results
    } catch (err) {
    console.log(err);
    }

    return users;
}

module.exports = {
    hashUserPassword,
    createNewUser,
    getUserList,
}