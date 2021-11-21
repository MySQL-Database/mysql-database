"use strict";

const errors = require('../errors/strings.js');

module.exports = async function(table){
	if(!table || typeof table !== "string") throw new TypeError(errors.table.replace("{received}", typeof table));
	
	let res = await this.query(`SHOW TABLE STATUS FROM ${this.db.pool.config.connectionConfig.database} WHERE name LIKE '${table}';`);
	return res[0] || null;
}