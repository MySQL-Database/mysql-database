"use strict";

const mysql = require('promise-mysql');
const EventEmitter = require('events');
const errors = require('../errors/strings.js');

module.exports = async function(table, key, value){
	if(!table) throw new TypeError(errors.table.replace("{received}", table));
	if(!key) throw new TypeError(errors.key.replace("{received}", key));
	if(value == null) throw new TypeError(errors.value.replace("{received}", value));
	
	let res = false;
	let data = await this.get(table, key) || [];
	if(!Array.isArray(data)) throw new TypeError(errors.array.replace("{key}", key));
	if(data.includes(value)){
		res = true;
	}
	return res;
}