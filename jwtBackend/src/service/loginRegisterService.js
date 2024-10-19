import bcrypt from "bcrypt"
import db from "../models/index"
import { Op } from "sequelize";
import jwtService from "../service/JWTService"
import { createToken } from "../middleware/JWTAction"

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

const checkPassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}

const handleLoginUser = async (rawDataUser) => {
    try {
        // rawDataUser: {valueLogin, password}
        let user = await db.User.findOne({
            where: {
                [Op.or]: {
                    email: rawDataUser.valueLogin,
                    phone: rawDataUser.valueLogin,
                }
            }
        })

        if(user) {
            if(checkPassword(rawDataUser.password, user.password)) {
                let groupWithRoles = await jwtService.getGroupWithRoles(user);
                let payload = {
                    email: user.email,
                    groupWithRoles
                }

                return {
                    EM: "ok!",
                    EC: 0,
                    DT: {
                        access_token: createToken(payload),
                        data: groupWithRoles
                    }
                }
            }
        }

        return {
            EM: "Your email/phone or password is incorrect!",
            EC: 1,
            DT: "",
        }
    } catch(e) {
        console.log(">>>", e);
        return {
            EM: "Something wrongs in service...",
            EC: -2,
            DT: "",
        }
    }
}

module.exports = {
    registerNewUser,
    handleLoginUser,
    hashUserPassword,
    checkExistEmail,
    checkExistPhone,
}