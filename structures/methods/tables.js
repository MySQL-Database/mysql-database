"use strict";

const mysql = require('promise-mysql');
const EventEmitter = require('events');
const errors = require('../errors/strings.js');

module.exports = async function(){
	let tables = await this.query(`show tables;`);
	return tables.map(m => m["Tables_in_" + this.db.pool.config.connectionConfig.database]);
}