"use strict";

const mysql = require('promise-mysql');
const EventEmitter = require('events');
const get = require('lodash/get');
const errors = require('../errors/strings.js');

module.exports = async function(table, key){
	if(!table){
		throw new ReferenceError(errors.table.replace("{received}", table));
	}
	if(!key){
		throw new ReferenceError(errors.key.replace("{received}", key));
	}
	let db = this.db;
	let keys = key.split('.');
	let keys2 = key.split('.');
	if(keys.length > 1){
		key = keys.shift();
	}
	let res = await db.query({
		sql: "SELECT value FROM " + table + " WHERE `key_name` = ?",
		values: [key]
	});
	let value = null;
	if(res[0] && res[0].value){
		value = res[0].value;
		if(!isNaN(value)){
			value = Number(value);
		}
		try{
			value = JSON.parse(value);
		}catch(e){}
	}
	if(keys2.length > 1 && typeof value !== 'object'){
		throw new ReferenceError(errors.targetNotObject.replace("{key}", key));
	}else if(keys2.length > 1 && typeof value === 'object'){
		value = get(value, keys.join(".")) || null;
	}
	return value;
}