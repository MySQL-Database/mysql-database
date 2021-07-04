"use strict";

const mysql = require('promise-mysql');
const EventEmitter = require('events');
const errors = require('../errors/strings.js');

module.exports = async function(table, key, value){
	if(!table) throw new TypeError(errors.table.replace("{received}", table));
	if(!key) throw new TypeError(errors.key.replace("{received}", key));
	if(value == null) throw new TypeError(errors.value.replace("{received}", value));
	if(isNaN(value) || value < 1) throw new TypeError(errors.numberType.replace("{received}", value));
	
	let res;
	let tables = await this.tables();
	if(!tables.includes(table)){
		res = await this.set(table, key, value);
	}else{
		let data = await this.get(table, key) || 0;
		if(isNaN(data)) throw new TypeError(errors.notNumber.replace("{key}", key));
		res = await this.set(table, key, Number(data) + Number(value));
	}
	return res;
}