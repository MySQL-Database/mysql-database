"use strict";

const mysql = require('promise-mysql');
const EventEmitter = require('events');
const set = require('lodash/set');
const errors = require('../errors/strings.js');

module.exports = async function(table, key, value){
	if(!table){
		throw new ReferenceError(errors.table.replace("{received}", table));
	}
	if(!key){
		throw new ReferenceError(errors.key.replace("{received}", key));
	}
	if(!value){
		throw new ReferenceError(errors.value.replace("{received}", value));
	}
	let db = this.db;
	await db.query("SET GLOBAL max_allowed_packet=1073741824");
	await db.query('CREATE TABLE IF NOT EXISTS `' + table + '` (`id` int(11) NOT NULL auto_increment, `key_name` LONGTEXT NULL, `value` LONGTEXT NULL, `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`))');
	let data;
	let keys = key.split('.');
	if(keys.length > 1){
		key = keys.shift();
		data = await this.get(table, key);
		if(!data || typeof data !== 'object'){
			data = {};
			await db.query({
				sql: "INSERT INTO " + table + " (`key_name`, `value`) VALUES (?, ?)",
				values: [key,JSON.stringify(data)]
			});
		}
		value = set(data, keys.join("."), value);
	}else{
		data = await this.get(table, key);
	}
	if(Array.isArray(value) || typeof value === 'object'){
		value = JSON.stringify(value);
	}
	if(data){
		await db.query({
			sql: "UPDATE " + table + " SET `value` = ? WHERE `key_name` = ?",
			values: [value,key]
		});
	}else{
		await db.query({
			sql: "INSERT INTO " + table + " (`key_name`, `value`) VALUES (?, ?)",
			values: [key,value]
		});
	}
	let returnedValue = await this.get(table, key);
	return returnedValue;
}