"use strict";

const mysql = require('promise-mysql');
const EventEmitter = require('events');
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
	let data;
	let res;
	let tables = await this.tables();
	if(!tables.includes(table)){
		res = false;
	}else{
		data = await this.get(table, key) || [];
		if(!Array.isArray(data)){
			throw new ReferenceError(errors.array.replace("{key}", key));
		}
		if(data.includes(value)){
			res = true;
		}else{
			res = false;
		}
	}
	return res;
}