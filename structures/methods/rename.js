"use strict";

const errors = require('../errors/strings.js');

module.exports = async function(table, newTable){
	if(!table || !newTable || typeof table !== "string" || typeof newTable !== "string") throw new TypeError(errors.table.replace("{received}", typeof table));
	
	await this.query(`ALTER TABLE ${table} RENAME TO ${newTable}`);
	return true;
}