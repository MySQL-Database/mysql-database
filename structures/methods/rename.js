"use strict";

const errors = require('../errors/strings.js');

module.exports = async function(table, newTable){
	if(!table || !newTable) throw new TypeError(errors.table.replace("{received}", table));
	
	await this.query(`ALTER TABLE ${table} RENAME TO ${newTable}`);
	return true;
}