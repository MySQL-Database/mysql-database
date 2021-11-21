"use strict";

const errors = require('../errors/strings.js');

module.exports = async function(table){
	if(!table || typeof table !== "string") throw new TypeError(errors.table.replace("{received}", typeof table));
	
	await this.drop(table);
	await this.create(table);
	return true;
}