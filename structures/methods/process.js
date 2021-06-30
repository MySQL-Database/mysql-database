"use strict";

const mysql = require('promise-mysql');
const EventEmitter = require('events');
const errors = require('../errors/strings.js');

module.exports = async function(){
	let db = this.db;
	let res = await db.query(`SHOW PROCESSLIST;`);
	return res;
}