import bcrypt from "bcrypt"
import db from "../models/index"

const salt = bcrypt.genSaltSync(10);
const hashUserPassword = (password) => {
    let hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword
}

const checkExistEmail = async (email) => {
    const isEmailExist = await db.User.findOne({
        where: {email: email}
    })
    
    return isEmailExist != null;
}

const checkExistPhone = async (phone) => {
    const isPhoneExist = await db.User.findOne({
        where: {phone: phone}
    })
    
    return isPhoneExist != null;
}

const registerNewUser = async (rawDataUser) => {
    try {
        // rawDataUser: { email, phone, username, password }

        // check exist email
        const isExistEmail = await checkExistEmail(rawDataUser.email);
        if(isExistEmail) {
            return {
                EM: "The email is already exist",
                EC: 1
            }
        }

        // check exist phone
        const isExistPhone = await checkExistPhone(rawDataUser.phone);
        if(isExistPhone) {
            return {
                EM: "The phone is already exist",
                EC: 1
            }
        }

        // create new user
        await db.User.create({
            email: rawDataUser.email,
            phone: rawDataUser.phone,
            name: rawDataUser.username,
            password: hashUserPassword(rawDataUser.password)
        })

        return {
            EM: "A user is created successfully!",
            EC: 0
        }
    } catch(e) {
        console.log(e)
        return {
            EM: "Something wrongs in service...",
            EC: -2
        }
    }
}

module.exports = {
    registerNewUser,
}