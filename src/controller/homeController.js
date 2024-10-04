import { createNewUser, getUserList, deleteUserById } from "../service/userService"
require('dotenv').config()

const handleHelloWorld = (req, res) => {
    return res.render("home.ejs");
}   

const handleUserPage = async (req, res) => {
    let users = await getUserList();

    return res.render("user.ejs", {users})
}

const handleCreateNewUser = async (req, res) => {
    let {email, username, password} = req.body;

    await createNewUser(email, username, password);

    return res.redirect("/user")
}

const handleDeleteUser = async (req, res) => {
    await deleteUserById(req.params.id);
    return res.redirect("/user")
}

module.exports = {
    handleHelloWorld,
    handleUserPage,
    handleCreateNewUser,
    handleDeleteUser,
}