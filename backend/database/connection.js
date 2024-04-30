import mysql, { createConnection } from 'mysql';

export const connectDatabase = () => {
    const con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "msg-sports"
    });


    con.connect(function (err) {
        if (err) throw err;
        console.log("Database connected..");
    });

    return con;
}

export const executeQuery = (sql, params) => {
    let con = connectDatabase();
    return new Promise(async (resolve, reject) => {
        con.query(sql, params, (err, result, fields) => {
            if (err) reject(err);
            else resolve({ result: result, fields: fields })
            con.end();
        });
    })
}
