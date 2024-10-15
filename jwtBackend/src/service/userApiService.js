import db from "../models";
import { hashUserPassword, checkExistEmail, checkExistPhone } from "./loginRegisterService"

const read = async (query) => {
    try {
        // query: {page, limit}
        let data = {
            totalPage: 0,
            users: [],
        }

        let page = +query.page;
        let limit = +query.limit

        if(page && limit) {
            let offset = (page - 1) * limit;
            const { count, rows } = await db.User.findAndCountAll({
                attributes: ['id', 'email', 'name', 'address', 'phone', 'sex'],
                include: {model: db.Group, attributes: ['name']},
                offset: offset,
                limit: limit,
            })

            data.totalPage = Math.ceil(count / limit);
            data.users = rows;

        } else {
            data.users = await db.User.findAll({
                attributes: ['id', 'email', 'name', 'address', 'phone', 'sex'],
                include: {model: db.Group, attributes: ['name']}
            });
        }

        return {
            EM: "Sucess read",
            EC: 0,
            DT: data,
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

const destroy = async (id) => {
    try {
        await db.User.destroy({
            where: {
                id: id
            }
        })

        return {
            EM: "Success delete",
            EC: 0,
            DT: ""
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

const create = async (user) => {
    try {
        // user: {email, name, password, address, phone, sex, groupId}
        console.log(user)

        // check exist email
        const isExistEmail = await checkExistEmail(user.email);
        if(isExistEmail) {
            return {
                EM: "The email is already exist",
                EC: 1,
                DT: ""
            }
        }

        // check exist phone
        const isExistPhone = await checkExistPhone(user.phone);
        if(isExistPhone) {
            return {
                EM: "The phone is already exist",
                EC: 1,
                DT: ""
            }
        }

        await db.User.create({
            email: user.email,
            name: user.name,
            password: hashUserPassword(user.password),
            address: user.address,
            phone: user.phone,
            sex: user.sex,
            groupId: user.groupId,
        })

        return {
            EM: "Create new user success",
            EC: 0,
            DT: ""
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
    read,
    destroy,
    create,
}