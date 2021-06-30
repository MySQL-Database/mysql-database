"use strict";

const mysql = require('promise-mysql');
const EventEmitter = require('events');
const errors = require('../errors/strings.js');

module.exports = async function(variables){
	if(!variables){
		throw new ReferenceError(errors.variables.replace("{received}", variables));
	}
	if(typeof variables !== "object"){
		throw new ReferenceError(errors.variablesNotObject.replace("{received}", variables));
	}
	let db = this.db;
	let res = {};
	let keys = Object.keys(variables)
	for(var i = 0; i < keys.length; i++){
		let returned = await db.query(`SET GLOBAL ${keys[i]}=${variables[keys[i]]};`);
		if(!returned.message){
			res[keys[i]] = variables[keys[i]];
		}else{
			res[keys[i]] = returned;
		}
	}
	return res;
}