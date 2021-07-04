"use strict";

const mysql = require('promise-mysql');
const EventEmitter = require('events');
const errors = require('../errors/strings.js');

module.exports = async function(table){
	if(!table) throw new TypeError(errors.table.replace("{received}", table));
	
	let all = await this.query("SELECT * from " + table);
	let res = [];
	all.forEach(obj => {
		obj.ID = obj.key_name
		let data = obj.value;
		if(!isNaN(data)){
			data = Number(data);
		}
		try{
			data = JSON.parse(data);
		}catch(e){}
		obj.data = data;
		delete obj.id;
		delete obj.key_name;
		delete obj.value;
		res.push(obj);
	})
	return res;
}