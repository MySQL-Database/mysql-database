"use strict";

const mysql = require('promise-mysql');
const EventEmitter = require('events');
const errors = require('../errors/strings.js');

module.exports = async function(table, number){
	if(!table) throw new TypeError(errors.table.replace("{received}", table));
	if(number == null) throw new TypeError(errors.number.replace("{received}", number));
	if(isNaN(number) || number < 1) throw new TypeError(errors.numberType.replace("{received}", number));
	
	await this.query(`ALTER TABLE ${table} AUTO_INCREMENT = ${number};`);
	let res = await this.stats(table);
	return res.Auto_increment;
}