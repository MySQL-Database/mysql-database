"use strict";

const errors = require('../errors/strings.js');

module.exports = async function(table){
	if(!table || typeof table !== "string") throw new TypeError(errors.table.replace("{received}", typeof table));
	
	let tables = await this.tables();
	if(!tables.includes(table)) return false;
	let all = await this.all(table);
	if(!all.length) return false;
	await this.drop(table, true);
	this.emit("tableClear", table);
	return this.create(table, true);
}