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
	if(isNaN(value) || value < 1){
		throw new ReferenceError(errors.numberType.replace("{received}", value));
	}
	let data;
	let res;
	let tables = await this.tables();
	if(!tables.includes(table)){
		data = await this.set(table, key, value);
		res = value;
	}else{
		data = await this.get(table, key);
		if(!data){
			data = 0;
		}
		if(isNaN(data)){
			throw new ReferenceError(errors.notNumber.replace("{key}", key));
		}
		data = data + Number(value);
		await this.set(table, key, data);
		res = data;
	}
	return res;
}