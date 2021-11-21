"use strict";

const unset = require('lodash/unset');
const errors = require('../errors/strings.js');

module.exports = async function(table, key){
	if(!table || typeof table !== "string") throw new TypeError(errors.table.replace("{received}", typeof table));
	if(!key || typeof key !== "string") throw new TypeError(errors.key.replace("{received}", typeof key));
	
	let res = true;
	let keys = key.split('.');
	if(keys.length > 1){
		key = keys.shift();
		let data = await this.get(table, key) || {};
		if(typeof data !== 'object') throw new TypeError(errors.targetNotObject.replace("{key}", key));
		res = unset(data, keys.join("."));
		await this.set(table, key, data);
	}else{
		await this.query(`DELETE FROM ${table} WHERE key_name = '${key}'`);
	}
	return res;
}