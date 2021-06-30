"use strict";

const mysql = require('promise-mysql');
const EventEmitter = require('events');
const errors = require('../errors/strings.js');

module.exports = async function(table, newTable){
	if(!table || !newTable){
		throw new ReferenceError(errors.table.replace("{received}", table));
	}
	let db = this.db;
	await db.query(`ALTER TABLE ${table} RENAME TO ${newTable}`);
	return true;
}