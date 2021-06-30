"use strict";

const mysql = require('promise-mysql');
const EventEmitter = require('events');
const errors = require('../errors/strings.js');

module.exports = async function(table){
	if(!table){
		throw new ReferenceError(errors.table.replace("{received}", table));
	}
	let db = this.db;
	let res = await db.query(`SHOW TABLE STATUS FROM ${db.pool.config.connectionConfig.database} WHERE name LIKE '${table}';`);
	return res[0] || null;
}