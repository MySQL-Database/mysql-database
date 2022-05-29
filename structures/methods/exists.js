"use strict";

const errors = require('../errors/strings.js');

module.exports = async function(table, key){
	if(!table || typeof table !== "string") throw new TypeError(errors.table.replace("{received}", typeof table));
	if(!key || typeof key !== "string") throw new TypeError(errors.key.replace("{received}", typeof key));
	
	let tables = await this.tables();
	if(!tables.includes(table)) return false;
	let data = await this.get(table, key);
	return (data != null) ? true : false;
}