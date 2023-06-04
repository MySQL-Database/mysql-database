"use strict";

const set = require('lodash/set');
const errors = require('../errors/strings.js');

module.exports = async function(table, key, value, isBaseValue){
	if(!table || typeof table !== "string") throw new TypeError(errors.table.replace("{received}", typeof table));
	if(!key || typeof key !== "string") throw new TypeError(errors.key.replace("{received}", typeof key));
	if(value === undefined) throw new TypeError(errors.value.replace("{received}", typeof value));
	
	await this.create(table);
	
	let oldData = await this.get(table, key);
	
	let keys = key.split('.'),
	keys2 = key.split('.');
	if(keys.length > 1) key = keys.shift();
	
	let data = await this.query({
		sql: `SELECT value FROM \`${table}\` WHERE \`key_name\` = ?`,
		values: [key]
	});
	if(!data.length){
		await this.query({
			sql: `INSERT INTO \`${table}\` (\`key_name\`, \`value\`) VALUES (?, ?)`,
			values: [key,JSON.stringify({})]
		});
	}
	data = await this.get(table, key) || {};
	if(keys2.length > 1 && typeof data === 'object'){
		value = set(data, keys.join("."), value);
	}else if(keys2.length > 1){
		throw new ReferenceError(errors.targetNotObject.replace("{key}", key));
	}
	
	try{
		value = JSON.stringify(value);
	}catch(e){}
	await this.query({
		sql: `UPDATE \`${table}\` SET \`value\` = ? WHERE \`key_name\` = ?`,
		values: [value,key]
	});
	let modifiedAt = Date.now()
	
	let newData = await this.get(table, (keys2.length > 1) ? key + "." + keys.join(".") : key);
	this.emit("dataModification", {oldData: (isBaseValue ? Buffer.from(oldData, 'base64').toString('binary') : oldData), newData: (isBaseValue ? Buffer.from(newData, 'base64').toString('binary') : newData), type: (oldData == null && newData != null) ? "SET" : "UPDATE", table, modifiedAt});
	return newData;
}