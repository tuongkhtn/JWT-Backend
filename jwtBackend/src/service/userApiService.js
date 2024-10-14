import db from "../models";

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
                attributes: ['id', 'name', 'address', 'phone', 'sex'],
                include: {model: db.Group, attributes: ['name']},
                offset: offset,
                limit: limit,
            })

            data.totalPage = Math.ceil(count / limit);
            data.users = rows;

        } else {
            data.users = await db.User.findAll({
                attributes: ['id', 'name', 'address', 'phone', 'sex'],
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

module.exports = {
    read,
}