import userService from "../service/userService"
require('dotenv').config()

const handleHelloWorld = (req, res) => {
    return res.render("home.ejs");
}   

const handleUserPage = async (req, res) => {
    let users = await userService.getUserList();

    return res.render("user.ejs", {users})
}

const handleCreateNewUser = async (req, res) => {
    let {email, username, password} = req.body;

    await userService.createNewUser(email, username, password);

    return res.redirect("/users")
}

const handleDeleteUser = async (req, res) => {
    await userService.deleteUserById(req.params.id);
    return res.redirect("/users")
}

const getUpdateUserPage = async (req, res) => {
    let user = await userService.getUserById(req.params.id);
    let dataUser = user;

    return res.render("user_update.ejs", { dataUser })
}

const handleUpdateUser = async (req, res) => {
    let {id, email, username} = req.body;
    
    await userService.updateUserById(id, email, username);

    return res.redirect("/users")
}

module.exports = {
    handleHelloWorld,
    handleUserPage,
    handleCreateNewUser,
    handleDeleteUser,
    getUpdateUserPage,
    handleUpdateUser,
}