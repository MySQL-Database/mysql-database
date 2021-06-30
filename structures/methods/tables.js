"use strict";

const mysql = require('promise-mysql');
const EventEmitter = require('events');
const errors = require('../errors/strings.js');

module.exports = async function(){
	let db = this.db;
	let tables = await db.query(`show tables;`);
	tables = tables.map(m => m["Tables_in_" + db.pool.config.connectionConfig.database])
	return tables;
}