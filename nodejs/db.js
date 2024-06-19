async function connect() {
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://user:userpassword@db:3306/nodejsdb");
    global.connection = connection;
    return connection;
}

async function selectPeople() {
    const conn = await connect();
    const query = 'SELECT * FROM people;';
	const result = await conn.query(query);
    const [rows] = result;
    return rows;
}

async function insertPerson(nome) {
    const conn = await connect();
    const query = 'INSERT INTO people (nome) VALUES (?);';
	const result = await conn.query(query, [nome]);
    return result;
}

module.exports = {selectPeople, insertPerson}