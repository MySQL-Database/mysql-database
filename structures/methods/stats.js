"use strict";

const mysql = require('promise-mysql');
const EventEmitter = require('events');
const errors = require('../errors/strings.js');

module.exports = async function(table){
	if(!table) throw new TypeError(errors.table.replace("{received}", table));
	
	let res = await this.query(`SHOW TABLE STATUS FROM ${this.db.pool.config.connectionConfig.database} WHERE name LIKE '${table}';`);
	return res[0] || null;
}