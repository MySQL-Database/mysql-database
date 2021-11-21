"use strict";

const errors = require('../errors/strings.js');

module.exports = async function(table, key, value){
	if(!table || typeof table !== "string") throw new TypeError(errors.table.replace("{received}", typeof table));
	if(!key || typeof key !== "string") throw new TypeError(errors.key.replace("{received}", typeof key));
	if(value === undefined) throw new TypeError(errors.value.replace("{received}", typeof value));
	if(isNaN(value) || value <= 0) throw new TypeError(errors.numberType.replace("{received}", typeof value));
	
	let res;
	let tables = await this.tables();
	if(!tables.includes(table)){
		res = await this.set(table, key, 0 - Number(value));
	}else{
		let data = await this.get(table, key) || 0;
		if(isNaN(data)) throw new TypeError(errors.notNumber.replace("{key}", key));
		res = await this.set(table, key, data - Number(value));
	}
	return res;
}