import bcrypt from "bcrypt"
import mysql from "mysql2/promise"
import db from "../models/index"
require('dotenv').config()

const hashUserPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    let hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword
}

const createNewUser = async (email, username, password) => {
    let hashPassword = hashUserPassword(password);

    try {
        await db.User.create({
            EMAIL: email,
            NAME: username,
            PASSWORD: hashPassword
        })
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
          'SELECT * FROM User'
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
          'DELETE FROM User WHERE ID = ?', [id]
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
          'SELECT * FROM User WHERE ID = ?', [id],
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
          'UPDATE User SET EMAIL = ?, NAME = ? WHERE ID = ?', [email, username, id],
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