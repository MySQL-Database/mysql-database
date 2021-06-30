"use strict";

const mysql = require('promise-mysql');
const EventEmitter = require('events');
const errors = require('../errors/strings.js');

module.exports = async function(table, key, value, option){
	if(!table){
		throw new ReferenceError(errors.table.replace("{received}", table));
	}
	if(!key){
		throw new ReferenceError(errors.key.replace("{received}", key));
	}
	if(!value){
		throw new ReferenceError(errors.value.replace("{received}", value));
	}
	let data = await this.get(table, key);
	if(!data){
		throw new ReferenceError(errors.dataNotFound.replace("{key}", key));
	}
	if(!Array.isArray(data)){
		throw new ReferenceError(errors.array.replace("{key}", key));
	}
	if(option && option.toLowerCase() === "all"){
		data = data.filter(obj => obj !== value);
	}else{
		data.splice(data.indexOf(value), 1);
	}
	let res = await this.set(table, key, data);
	return res;
}