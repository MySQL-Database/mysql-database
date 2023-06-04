"use strict";

const errors = require('../errors/strings.js');

module.exports = async function(table, isClear){
	if(!table || typeof table !== "string") throw new TypeError(errors.table.replace("{received}", typeof table));
	
	let tables = await this.tables();
	if(!tables.includes(table)) return false;
	this.db.query(`DROP TABLE \`${table}\``);
	if(tables.includes(table) && !isClear) this.emit("tableDelete", table);
	return true;
}