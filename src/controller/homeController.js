import { hashUserPassword, createNewUser, getUserList } from "../service/userService"
require('dotenv').config()

const handleHelloWorld = (req, res) => {
    return res.render("home.ejs");
}   

const handleUserPage = (req, res) => {
    return res.render("user.ejs")
}

const handleCreateNewUser = (req, res) => {
    let {email, username, password} = req.body;

    console.log({email, username, password} );

    // createNewUser(email, username, password);
    getUserList();

    return res.send("handleCreateUser")
}

module.exports = {
    handleHelloWorld,
    handleUserPage,
    handleCreateNewUser,
}