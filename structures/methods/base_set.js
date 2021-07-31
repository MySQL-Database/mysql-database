"use strict";

const errors = require('../errors/strings.js');

module.exports = async function(table, key, value){
	if(!table) throw new TypeError(errors.table.replace("{received}", table));
	if(!key) throw new TypeError(errors.key.replace("{received}", key));
	if(value == null) throw new TypeError(errors.value.replace("{received}", value));
	if(typeof value !== "string") throw new TypeError(errors.baseNotString);
	
	await this.set(table, key, Buffer.from(value, 'binary').toString('base64'));
	return this.base_get(table, key);
}