"use strict";

const mysql = require('promise-mysql');
const EventEmitter = require('events');
const errors = require('../errors/strings.js');

module.exports = async function(options){
	if(!options){
		throw new ReferenceError(errors.options.replace("{received}", options));
	}
	if(typeof options !== "object"){
		throw new ReferenceError(errors.optionsNotObject.replace("{received}", options));
	}
	let db = this.db;
	let res = {};
	let keys = Object.keys(options)
	for(var i = 0; i < keys.length; i++){
		let returned = await db.query(`SET GLOBAL ${keys[i]}=${options[keys[i]]};`);
		if(!returned.message){
			res[keys[i]] = options[keys[i]];
		}else{
			res[keys[i]] = returned;
		}
	}
	return res;
}