"use strict";

const errors = require('../errors/strings.js');

module.exports = async function(table, key){
	if(!table || typeof table !== "string") throw new TypeError(errors.table.replace("{received}", typeof table));
	if(!key || typeof key !== "string") throw new TypeError(errors.key.replace("{received}", typeof key));
	
	let data = await this.get(table, key);
	if(typeof data !== "string") throw new TypeError(errors.baseNotString);
	return Buffer.from(data, 'base64').toString('binary');
}