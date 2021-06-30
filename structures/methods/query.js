"use strict";

const mysql = require('promise-mysql');
const EventEmitter = require('events');
const errors = require('../errors/strings.js');

module.exports = async function(query){
	if(!query){
		throw new ReferenceError(errors.query.replace("{received}", query));
	}
	let db = this.db;
	return db.query(`${query}`);
}