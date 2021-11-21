"use strict";

const errors = require('../errors/strings.js');

module.exports = async function(table, key, value){
	if(!table || typeof table !== "string") throw new TypeError(errors.table.replace("{received}", typeof table));
	if(!key || typeof key !== "string") throw new TypeError(errors.key.replace("{received}", typeof key));
	if(value === undefined) throw new TypeError(errors.value.replace("{received}", typeof value));
	if(typeof value !== "string") throw new TypeError(errors.baseNotString);
	
	await this.set(table, key, Buffer.from(value, 'binary').toString('base64'));
	return this.base_get(table, key);
}