"use strict";

const mysql = require('promise-mysql');
const EventEmitter = require('events');
const errors = require('../errors/strings.js');

module.exports = async function(){
	return this.db.query(`SHOW PROCESSLIST;`);
}