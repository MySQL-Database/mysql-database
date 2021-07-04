"use strict";

const mysql = require('promise-mysql');
const EventEmitter = require('events');
const errors = require('../errors/strings.js');

module.exports = async function(query){
	if(!query) throw new TypeError(errors.query.replace("{received}", query));
	
	return this.db.query(query);
}