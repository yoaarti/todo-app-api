const mysql = require('mysql');
let connection;


const createConnection = ()=> {
	connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'rt',
	database: 'todo_app'
	})

	connection.connect(function(err) { 
	    if (err) {
	      console.error('error connecting: ' + err.stack);
	      return;
	    }
	    console.log('connected as id ' + connection.threadId);
	    createSchema();
	});
}

const runQuery =(query, cb)=> {
	return connection.query(query, cb)
}

const createSchema = ()=> {
	let query = `CREATE TABLE IF NOT EXISTS todo_list(
    id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL
    ) ENGINE=INNODB;
    `;
 
    let query1 = `CREATE TABLE IF NOT EXISTS user(
    id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    mobile_number VARCHAR(10),
    email VARCHAR(50),
    password VARCHAR(255)
    ) ENGINE=INNODB`;

    connection.query(query,(err,data)=>{
		if(err){
			console.log(err);
		}
		else{
			console.log("Migrations TABLE(todo_list) created successfully..")
		}
	})

	connection.query(query1,(err,data)=>{
		if(err){
			console.log(err);
		}
		else{
			console.log("Migrations user table created successfully..")
		}
	})
}

module.exports = {
	createConnection,
	runQuery,
}