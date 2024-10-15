import db from "../models/index"

const read = async () => {
    try {
        let data = await db.Group.findAll({
            attributes: ['id', 'name'],
            order: [['name', 'ASC']]
        })

        return {
            EM: "Read group name success",
            EC: 0,
            DT: data
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