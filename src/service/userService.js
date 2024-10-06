import bcrypt from "bcrypt"
import mysql from "mysql2/promise"
require('dotenv').config()

const hashUserPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    let hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword
}

const createNewUser = async (email, username, password) => {
    let hashPassword = hashUserPassword(password);

    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    })

    try {
        const [results, fields] = await connection.query(
          'INSERT INTO USERS (EMAIL, NAME, PASSWORD) VALUES (?, ?, ?)', [email, username, hashPassword]
        );
    } catch (err) {
        console.log(err);
    }
}

const getUserList = async () => {
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
      
        return results
    } catch (err) {
        console.log(err);
    }

}

const deleteUserById = async (id) => {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    })

    try {
        const [results, fields] = await connection.query(
          'DELETE FROM USERS WHERE ID = ?', [id]
        );      
    } catch (err) {
        console.log(err);
    }
}

const getUserById = async (id) => {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    })

    try {
        const [results, fields] = await connection.query(
          'SELECT * FROM USERS WHERE ID = ?', [id],
        );      
        console.log(results);
        return results;
    } catch (err) {
        console.log(err);
    }
}

const updateUserById = async (id, email, username) => {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    })

    try {
        const [results, fields] = await connection.query(
          'UPDATE USERS SET EMAIL = ?, NAME = ? WHERE ID = ?', [email, username, id],
        );      
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    hashUserPassword,
    createNewUser,
    getUserList,
    deleteUserById,
    getUserById,
    updateUserById
}