<div align="center">
	<br />
	<p>
		<a href="https://www.npmjs.com/package/mysql-database"><img src="https://cdn.discordapp.com/attachments/858540031160877077/863418307109453874/1200px-MySQL.png" width="300" alt="MySQL-database" /></a>
	</p>
	<br/>
	<p>
		<a href="https://www.npmjs.com/package/mysql-database">
			<img src="https://nodei.co/npm/mysql-database.png">
		</a>
	</p>
	<p>
		<a href="https://www.npmjs.com/package/mysql-database"><img src="https://img.shields.io/npm/v/mysql-database.svg?maxAge=3600" alt="NPM version" /></a>
		<a href="https://www.npmjs.com/package/mysql-database"><img src="https://img.shields.io/npm/dt/mysql-database.svg?maxAge=3600" alt="NPM downloads" /></a>
	</p>
</div>

# [MySQL Database](https://www.npmjs.com/package/mysql-database)
<br/>

# Table of contents

- [About](#about)
- [Installation](#installation)
- [Events](#events)
- [Methods](#methods)
- [Contributing](#contributing)

## About 

- Easily modify your MySQL database data with easy functions
- Useful for websites & large projects where it makes managing data easier & faster
- Supports the Promise-API, you will be able to use .then, .catch, await, etc...
- & more...

## Installation

``
npm i mysql-database
``

## Documentation

[View Documentation](https://mysql-db.cloud)

#### Events
- connected (connection)
```js
// Import Libary
const MySQL = require('mysql-database');
const database = new MySQL();

// Create Your Own Connection
run();
async function run(){
	let db = await database.connect({ 
		host: 'localhost',
		port: '3306', // the default is 3306
		user: 'root',
		password: '',
		database: 'my_database',
		charset: 'utf8mb4'
	});

	// database connected event
	db.on('connected', function (connection) {
		console.log('Database Connected');
	})
}
```
#### Methods
- set (table, key, value)
```js
await db.set('my_table', 'foo', 'bar');
// -> Stores 'bar' in 'foo' key name in the table 'my_table'
```
- get (table, key)
```js
await db.get('my_table', 'foo');
// -> Gets foo key name value (which is bar) in the table 'my_table'
```
- base_set (table, key, value)
```js
await db.base_set('my_table', 'foo', 'bar');
// -> Stores 'bar' in 'foo' key name in the table 'my_table' but base encrypted
```
- base_get (table, key)
```js
await db.base_get('my_table', 'foo');
// -> Gets foo key name value (which is bar) in the table 'my_table' for encrypted rows using base_set method
```
- push (table, array, value)
```js
await db.push('my_table', 'fruits', 'banana');
// -> pushs 'banana' to 'fruits' array in 'my_table' table
```
- pull (table, array, value)
```js
await db.pull("my_table", "fruits", "banana");
// -> pulls FIRST 'banana' from 'fruits' in 'my_table'
await db.pull("my_table", "fruits", "banana", "all");
// -> pulls ALL 'banana' from 'fruits' in 'my_table'
```
- includes (table, array, value)
```js
await db.includes("my_table", "fruits", "banana");
// -> Checks if the array includes provided value
```
- add (table, key, number)
```js
await db.add("my_table", "price", 10);
// -> add 10 to price in 'my_table' table
```
- sub (table, key, number)
```js
await db.sub("my_table", "price", 5);
// -> subtracts 5 from price - the remaining is 5 from price in 'my_table' table
```
- all (table)
```js
await db.all("my_table");
// -> retutn all the data in 'my_table' table
```
- delete (table, key)
```js
await db.delete("my_table", "foo");
// -> delete foo key in 'my_table' table
```
- tables ()
```js
await db.tables();
// -> return array of all tables existed in the database
```
- rename (table, new_table_name)
```js
await db.rename("my_table", "new_name");
// -> renames table name
```
- stats (table)
```js
await db.stats("my_table");
// -> return table info
```
- query (query)
```js
await db.query("DROP TABLE my_table;")
// -> executes a SQL query
```
- auto_increment (table, number)
```js
await db.auto_increment("my_table", 5);
// -> sets 'my_table' table auto increment to 5
```
- create (table)
```js
await db.create("table_name");
// -> Create empty table with "table_name" name without inserting any data to it
```
- drop (table)
```js
await db.drop("table_name");
// -> deletes the table 'table_name'
```
- clear (table)
```js
await db.clear("table_name");
// -> clears all 'table_name' table rows & data
```
- variables (variables_object)
```js
await db.variables({ 
	max_connections: 100000,
	max_connect_errors: 100000,
	wait_timeout: 60
});
// -> modifies any global variable
```
- ping ()
```js
await db.ping();
// -> gets database ping (in ms)
```
- process ()
```js
await db.process();
// -> returns the processes/connections list
```
- end ()
```js
await db.end();
// -> closes the connection
```

#### Contributing
© mysql-database, 2021 - 2022 | <a href="https://itariq.dev" target="_blank">TARIQ</a> <a href="mailto:contact@itariq.dev">(contact@itariq.dev)</a>
