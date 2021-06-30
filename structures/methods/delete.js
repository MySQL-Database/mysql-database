"use strict";

const mysql = require('promise-mysql');
const EventEmitter = require('events');
const unset = require('lodash/unset');
const errors = require('../errors/strings.js');

module.exports = async function(table, key){
	if(!table){
		throw new ReferenceError(errors.table.replace("{received}", table));
	}
	if(!key){
		throw new ReferenceError(errors.key.replace("{received}", key));
	}
	let res = true;
	let db = this.db;
	let keys = key.split('.');
	if(keys.length > 1){
		key = keys.shift();
		let data = await this.get(table, key);
		if(typeof data !== 'object'){
			throw new ReferenceError(errors.targetNotObject.replace("{key}", key));
		}
		res = unset(data, keys.join("."));
		await this.set(table, key, data);
	}else{
		await db.query(`DELETE FROM ${table} WHERE key_name = '${key}'`);
	}
	return res;
}