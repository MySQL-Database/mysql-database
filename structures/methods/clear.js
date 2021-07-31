"use strict";

const errors = require('../errors/strings.js');

module.exports = async function(table){
	if(!table) throw new TypeError(errors.table.replace("{received}", table));
	
	await this.drop(table);
	await this.create(table);
	return true;
}