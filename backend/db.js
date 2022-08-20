const mysql = require("mysql2/promise");
const config = require("./config");

const connection = async () => {
    const conn = await mysql.createConnection(config.db);

    console.log("mysql connected..")
    return conn;
}

const executeQuerySync = async query => {
    try {
        const conn = await connection();

        return await conn.execute(query);
    } catch(e) {
        console.log(e)
        throw e;
    }
}
const executeQueryAsync = async (query, cb) => {
    try {
        const conn = await connection();

        new Promise(async (resolve, reject) => {
            const res = await conn.execute(query); 
            resolve(cb(res))
        }).catch(res => console.log(res))
    } catch(e) {
        console.log(e)
        throw e;
    }
}

const whereQuery = (params = {}) => { 
     let whereList = Object.keys(params).map((key) => {
        return `${key}='${params[key]}'`;
     })

     return " WHERE " + whereList.join(" AND ");
}
const selectRecords = async (query) => {
    let [rows, ] = await executeQuerySync(query);

    console.log(rows)
    if(!rows)
        return [];
    return rows;
}
const makeInsertQuery = (table, params) => {
    let query = `INSERT INTO ${table} ( ${Object.keys(params[0]).join(",")} ) VALUES`;
    for(let i=0; i<params.length; i++) {
        if(i > 0)
            query += ", ";
        query += ` ( '${Object.values(params[i]).join("' , '")}' )`;
    }
    return query;
}
const insertRecords = async (table, params) => {
    let query = "";
    try {
        if(Array.isArray(params))
            query = makeInsertQuery(table, params);
        else if(typeof params === "object")
            query = makeInsertQuery(table, [params]);

        return await executeQuerySync(query);
    } catch(e) {
        throw e;
    }
}

const updateRecords = async (table, params, where) => {
    let query = `UPDATE ${table} SET `;
    let values = Object.keys(params).map(key => {
        return `${key}='${params[key]}'`;
    })
    query += values.join(", ");
    if(typeof where === "object")
        query += whereQuery(where);
    else if(typeof where === "string")
        query += " " + where;

    return await executeQuerySync(query);
}

const deleteRecords = async (table, where) => {
    let query = `DELETE FROM ${table} `;
    
    if(typeof where === "object")
        query += whereQuery(where);
    else if(typeof where === "string")
        query += " " + where;

    return await executeQuerySync(query);
}

module.exports = { executeQuerySync, executeQueryAsync, selectRecords, insertRecords, updateRecords, deleteRecords, whereQuery };