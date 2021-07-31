"use strict";

const errors = require('../errors/strings.js');

module.exports = async function(table, key){
	if(!table) throw new TypeError(errors.table.replace("{received}", table));
	if(!key) throw new TypeError(errors.key.replace("{received}", key));
	
	let data = await this.get(table, key);
	if(typeof data !== "string") throw new TypeError(errors.baseNotString);
	return Buffer.from(data, 'base64').toString('binary');
}