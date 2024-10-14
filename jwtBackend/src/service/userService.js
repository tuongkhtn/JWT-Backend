import bcrypt from "bcrypt"
import mysql from "mysql2/promise"
import db from "../models/index"
require('dotenv').config()

const salt = bcrypt.genSaltSync(10);
const hashUserPassword = (password) => {
    let hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword
}

const createNewUser = async (email, username, password) => {
    let hashPassword = hashUserPassword(password);

    try {
        await db.User.create({
            email: email,
            name: username,
            password: hashPassword
        })
    } catch (err) {
        console.log(err);
    }
}

const getUserList = async () => {
    let users = [];
    users = await db.User.findAll();
    return users;
}

const deleteUserById = async (id) => {
    await db.User.destroy({
        where: {
          id: id,
        },
    });
}

const getUserById = async (id) => {
    let user = {}
    user = await db.User.findOne({ where: { id: id } });
    return user;
}

const updateUserById = async (id, email, username) => {
    await db.User.update(
        { 
            email: email,
            name: username,
        },
        {
          where: {
            id: id,
          },
        },
    );
}

module.exports = {
    hashUserPassword,
    createNewUser,
    getUserList,
    deleteUserById,
    getUserById,
    updateUserById
}