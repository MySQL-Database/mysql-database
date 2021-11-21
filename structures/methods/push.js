"use strict";

const errors = require('../errors/strings.js');

module.exports = async function(table, key, value){
	if(!table || typeof table !== "string") throw new TypeError(errors.table.replace("{received}", typeof table));
	if(!key || typeof key !== "string") throw new TypeError(errors.key.replace("{received}", typeof key));
	if(value === undefined) throw new TypeError(errors.value.replace("{received}", typeof value));
	
	let res;
	let tables = await this.tables();
	if(!tables.includes(table)){
		res = await this.set(table, key, [value]);
	}else{
		let data = await this.get(table, key) || [];
		if(!Array.isArray(data)) throw new TypeError(errors.array.replace("{key}", key));
		data.push(value);
		res = await this.set(table, key, data);
	}
	return res;
}