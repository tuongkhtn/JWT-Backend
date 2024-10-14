import db from "../models";

const read = async () => {
    try {
        let users = await db.User.findAll({
            attributes: ['id', 'name', 'address', 'phone', 'sex'],
            include: {model: db.Group, attributes: ['name']}
        });

        return {
            EM: "Sucess read",
            EC: 0,
            DT: users,
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
}