"use strict";

const errors = require('../errors/strings.js');

module.exports = async function(table, key, value){
	if(!table) throw new TypeError(errors.table.replace("{received}", table));
	if(!key) throw new TypeError(errors.key.replace("{received}", key));
	if(value === undefined) throw new TypeError(errors.value.replace("{received}", value));
	
	let data = await this.get(table, key) || [];
	if(!Array.isArray(data)) throw new TypeError(errors.array.replace("{key}", key));
	return data.includes(value);
}