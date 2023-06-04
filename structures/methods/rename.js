"use strict";

const errors = require('../errors/strings.js');

module.exports = async function(table, newTable){
	if(!table || !newTable || typeof table !== "string" || typeof newTable !== "string") throw new TypeError(errors.table.replace("{received}", typeof table));
	if(table === newTable) throw new TypeError(errors.tableRenameSameName);
	
	let tables = await this.tables();
	if(!tables.includes(table)) throw new TypeError(errors.tableNotFound.replace("{table}", table));
	if(tables.includes(newTable)) throw new TypeError(errors.tableAlreadyExists.replace("{table}", newTable));
	
	await this.query(`ALTER TABLE \`${table}\` RENAME TO \`${newTable}\``);
	this.emit("tableRename", table, newTable);
	return true;
}