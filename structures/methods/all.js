"use strict";

const mysql = require('promise-mysql');
const EventEmitter = require('events');
const errors = require('../errors/strings.js');

module.exports = async function(table){
	if(!table){
		throw new ReferenceError(errors.table.replace("{received}", table));
	}
	let db = this.db;
	let all = await db.query("SELECT * from " + table);
	let res = [];
	all.forEach(obj => {
		obj.ID = obj.key_name
		let data = obj.value;
		if(!isNaN(data)){
			data = Number(data);
		}
		try{
			data = JSON.parse(data);
		}catch(e){
			
		}
		obj.data = data;
		delete obj.id;
		delete obj.key_name;
		delete obj.value;
		res.push(obj);
	})
	return res;
}