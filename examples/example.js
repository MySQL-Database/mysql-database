const MySQL = require('../index.js');
const database = new MySQL();

run();
async function run(){
	let db = await database.connect({ // creates a database connection
		host: 'localhost',
		port: '3306', // the default is 3306
		user: 'root',
		password: '',
		database: 'my_database',
		charset: 'utf8mb4'
	});
	
	db.on('connected', function(connection){ // database connected event
		console.log('Database Connected');
	});
	
	await db.set("my_table", "foo", "bar"); // stores 'bar' in 'foo' key name in the table 'my_table'
	
	let data = await db.get("my_table", "foo"); // gets foo key name value in the table 'my_table'
	console.log(data); // bar
	
	// you can also modify objects in all methods
	await db.set("my_table", "tariq.age", 14);
	
	data = await db.get("my_table", "tariq");
	console.log(data); // { age: 14 }
	
	await db.base_set("my_table", "foo", "bar"); // stores 'bar' in 'foo' key name in the table 'my_table' but base encrypted
	
	data = await db.base_get("my_table", "foo"); // gets foo key name value in the table 'my_table' for encrypted rows using base_set method
	console.log(data); // bar
	
	await db.push("my_table", "array", "Value"); // pushs 'Value' to 'array' in 'my_table' table | or creates an array with 'Value' if not exists
	await db.push("my_table", "array", "Value");
	await db.push("my_table", "array", "Value2");
	let array = await db.push("my_table", "array", "Value2");
	console.log(array); // ['Value', 'Value', 'Value2', 'Value2']
	
	array = await db.pull("my_table", "array", "Value"); // pulls first 'Value' from 'array' in 'my_table'
	console.log(array); // ['Value', 'Value2', 'Value2']
	
	array = await db.pull("my_table", "array", "Value2", "all"); // pulls all 'Value2' from 'array' in 'my_table'
	console.log(array); // ['Value']
	
	let isExisted = await db.includes("my_table", "array", "Value"); // returns a boolean if array includes specific data
	console.log(isExisted); // true
	
	await db.add("my_table", "count", 10); // adds '10' to 'count' in 'my_table' table
	
	await db.sub("my_table", "count", 5); // subtracts '5' from 'count' in 'my_table' table
	// remaining count is 5
	
	let all = await db.all("my_table"); // gets all data in the table 'my_table'
	console.log(all);
	/*
	[
		{
			updated_at: 2021-06-26T17:10:05.000Z,
			created_at: 2021-06-26T17:10:05.000Z,
			ID: 'foo',
			data: 'bar'
		},
		{
			updated_at: 2021-06-26T17:10:05.000Z,
			created_at: 2021-06-26T17:10:05.000Z,
			ID: 'tariq',
			data: { age: 14 }
		},
		{
			updated_at: 2021-06-26T17:10:05.000Z,
			created_at: 2021-06-26T17:10:05.000Z,
			ID: 'array',
			data: [ 'Value' ]
		},
		{
			updated_at: 2021-06-26T17:10:05.000Z,
			created_at: 2021-06-26T17:10:05.000Z,
			ID: 'count',
			data: 5
		}
	]
	*/
	
	await db.delete("my_table", "foo"); // deletes foo row in the table 'my_table'
	
	let tables = await db.tables(); // gets array of all tables existed in the database
	console.log(tables); // ['my_table']
	
	await db.rename("my_table", "new_table"); // renames table name
	
	let stats = await db.stats("new_table"); // gets table info/stats
	console.log(stats);
	/*
	{
		Name: 'new_table',
		Engine: 'InnoDB',
		Version: 10,
		Row_format: 'Dynamic',
		Rows: 2,
		Avg_row_length: 8192,
		Data_length: 16384,
		Max_data_length: 0,
		Index_length: 0,
		Data_free: 0,
		Auto_increment: 5,
		Create_time: 2021-06-26T17:10:04.000Z,
		Update_time: 2021-06-26T17:10:05.000Z,
		Check_time: null,
		Collation: 'utf8mb4_general_ci',
		Checksum: null,
		Create_options: '',
		Comment: '',
		Max_index_length: 0,
		Temporary: 'N'
	}
	*/
	
	await db.auto_increment("new_table", 5); // sets table auto increment to 5
	
	let response = await db.query("SELECT * from new_table;"); // executes a SQL query to the table
	console.log(response);
	/*
	[
		{
			id: 2,
			key_name: 'tariq',
			value: '{"age":14}',
			updated_at: 2021-06-26T17:10:05.000Z,
			created_at: 2021-06-26T17:10:05.000Z
		},
		{
			id: 3,
			key_name: 'array',
			value: '["Value"]',
			updated_at: 2021-06-26T17:10:05.000Z,
			created_at: 2021-06-26T17:10:05.000Z
		},
		{
			id: 4,
			key_name: 'count',
			value: '5',
			updated_at: 2021-06-26T17:10:05.000Z,
			created_at: 2021-06-26T17:10:05.000Z
		}
	]
	*/
	
	await db.create("table_name"); // creates table without inserting any data
	// note: store methods such as: (set,push,add,sub) creates the table automatically
	
	let ping = await db.ping(); // gets database ping (in ms)
	console.log(ping); // 27
	
	// clear all table data
	await db.clear("new_table");
	
	// lastly delete the table
	await db.drop("new_table"); // drops/deletes the table
	await db.drop("table_name");
	
	await db.variables({ // modifies any global variable
		max_connections: 100000,
		max_connect_errors: 100000,
		wait_timeout: 60
	});
	
	let processList = await db.process(); // gets all active process list
	console.log(processList);
	/*
	[
		{
			Id: 2,
			User: 'system user',
			Host: '',
			db: null,
			Command: 'Daemon',
			Time: null,
			State: 'InnoDB purge worker',
			Info: null,
			Progress: 0
		},
		{
			Id: 3,
			User: 'system user',
			Host: '',
			db: null,
			Command: 'Daemon',
			Time: null,
			State: 'InnoDB purge worker',
			Info: null,
			Progress: 0
		},
		{
			Id: 4,
			User: 'system user',
			Host: '',
			db: null,
			Command: 'Daemon',
			Time: null,
			State: 'InnoDB purge worker',
			Info: null,
			Progress: 0
		},
		{
			Id: 1,
			User: 'system user',
			Host: '',
			db: null,
			Command: 'Daemon',
			Time: null,
			State: 'InnoDB purge coordinator',
			Info: null,
			Progress: 0
		},
		{
			Id: 5,
			User: 'system user',
			Host: '',
			db: null,
			Command: 'Daemon',
			Time: null,
			State: 'InnoDB shutdown handler',
			Info: null,
			Progress: 0
		},
		{
			Id: 253,
			User: 'root',
			Host: 'localhost:61146',
			db: 'my_database',
			Command: 'Query',
			Time: 0,
			State: 'Init',
			Info: 'SHOW PROCESSLIST',
			Progress: 0
		}
	]
	*/
	
	await db.end(); // closes the connection
}