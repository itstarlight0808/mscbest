const db = require("../db");

exports.getStudioSetting = async (teacherId) => {
    let query = `SELECT * FROM studio_setting` + db.whereQuery({ teacherId });
    
    return await db.selectRecords(query);
}

exports.insertStudioSetting = async (teacherId) => {
    const defaultOptions = {
        teacherId
    };

    await db.insertRecords("studio_setting", defaultOptions);
}

exports.updateStudioSetting = async (teacherId, params) => {
    let [result, ] = await db.updateRecords("studio_setting", params, { teacherId });

    if(result.affectedRows)
        return true;
    return false;
}