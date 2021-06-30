"use strict";

const mysql = require('promise-mysql');
const EventEmitter = require('events');
const errors = require('../errors/strings.js');

module.exports = async function(table){
	if(!table){
		throw new ReferenceError(errors.table.replace("{received}", table));
	}
	let db = this.db;
	await db.query("DROP TABLE " + table);
	return true;
}