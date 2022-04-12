"use strict";

const errors = require('../errors/strings.js');

module.exports = async function(){
	let tables = await this.query(`SHOW TABLES;`);
	return tables.map(m => m["Tables_in_" + this.db.pool.config.connectionConfig.database.toLowerCase()]);
}