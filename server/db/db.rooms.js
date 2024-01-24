const { database } = require("../db/db.connect")
const { nanoid } = require("nanoid");

const CreateRoom = async ({ organiserId, date }) => {
    try {
        const room = nanoid(10);
        const password = nanoid(12);
        console.log({ room, password })
        const formattedDate = (new Date(date)).toISOString().slice(0, 19).replace('T', ' ');
        database.query(`INSERT INTO meetings VALUES('${room}','${formattedDate}','${organiserId}','${password}') ;`,
            (error, result, field) => {
                //result is returned as array of objects
                if (error) throw error;
                console.log(result);
            })
        return { room, password };
    } catch (error) {
        return null;
    }
}


module.exports = {
    CreateRoom
}