"use strict";

const mysql = require('promise-mysql');
const EventEmitter = require('events');
const errors = require('../errors/strings.js');

module.exports = async function(table){
	if(!table) throw new TypeError(errors.table.replace("{received}", table));
	
	await this.set(table, "initialized_at", new Date().toLocaleString());
	await this.delete(table, "initialized_at");
	return true;
}