import { hashUserPassword, createNewUser, getUserList } from "../service/userService"
require('dotenv').config()

const handleHelloWorld = (req, res) => {
    return res.render("home.ejs");
}   

const handleUserPage = async (req, res) => {
    let users = await getUserList();

    return res.render("user.ejs", {users})
}

const handleCreateNewUser = (req, res) => {
    let {email, username, password} = req.body;

    console.log({email, username, password} );

    // createNewUser(email, username, password);

    return res.send("handleCreateUser")
}

module.exports = {
    handleHelloWorld,
    handleUserPage,
    handleCreateNewUser,
}