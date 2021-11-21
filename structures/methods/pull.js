"use strict";

const errors = require('../errors/strings.js');

module.exports = async function(table, key, value, option){
	if(!table || typeof table !== "string") throw new TypeError(errors.table.replace("{received}", typeof table));
	if(!key || typeof key !== "string") throw new TypeError(errors.key.replace("{received}", typeof key));
	if(value === undefined) throw new TypeError(errors.value.replace("{received}", typeof value));
	
	let data = await this.get(table, key);
	if(!data) throw new TypeError(errors.dataNotFound.replace("{key}", key));
	if(!Array.isArray(data)) throw new TypeError(errors.array.replace("{key}", key));
	if(option && (option === true || option.toLowerCase() === "all")){
		data = data.filter(obj => obj !== value);
	}else{
		data.splice(data.indexOf(value), 1);
	}
	return this.set(table, key, data);
}