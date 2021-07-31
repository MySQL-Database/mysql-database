"use strict";

const errors = require('../errors/strings.js');

module.exports = async function(table, key, value, option){
	if(!table) throw new TypeError(errors.table.replace("{received}", table));
	if(!key) throw new TypeError(errors.key.replace("{received}", key));
	if(value == null) throw new TypeError(errors.value.replace("{received}", value));
	
	let data = await this.get(table, key);
	if(!data) throw new TypeError(errors.dataNotFound.replace("{key}", key));
	if(!Array.isArray(data)) throw new TypeError(errors.array.replace("{key}", key));
	if(option && option.toLowerCase() === "all"){
		data = data.filter(obj => obj !== value);
	}else{
		data.splice(data.indexOf(value), 1);
	}
	return this.set(table, key, data);
}