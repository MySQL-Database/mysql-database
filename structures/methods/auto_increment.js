"use strict";

const mysql = require('promise-mysql');
const EventEmitter = require('events');
const errors = require('../errors/strings.js');

module.exports = async function(table, number){
	if(!table){
		throw new ReferenceError(errors.table.replace("{received}", table));
	}
	if(!number){
		throw new ReferenceError(errors.number.replace("{received}", number));
	}
	if(isNaN(number) || number < 1){
		throw new ReferenceError(errors.numberType.replace("{received}", number));
	}
	let db = this.db;
	await db.query(`ALTER TABLE ${table} AUTO_INCREMENT = ${number};`);
	let res = await db.query(`SHOW TABLE STATUS FROM ${db.pool.config.connectionConfig.database} WHERE name LIKE '${table}';`);
	return res[0].Auto_increment;
}