"use strict";

const errors = require('../errors/strings.js');

module.exports = async function(table){
	if(!table || typeof table !== "string") throw new TypeError(errors.table.replace("{received}", typeof table));
	
	await this.drop(table, true);
	await this.create(table, true);
	this.emit("tableClear", table);
	return true;
}