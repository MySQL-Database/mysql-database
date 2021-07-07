"use strict";

const mysql = require('promise-mysql');
const EventEmitter = require('events');
const errors = require('../errors/strings.js');

module.exports = async function(table){
	if(!table) throw new TypeError(errors.table.replace("{received}", table));
	
	this.set(table, "initialized_table_at", new Date().toLocaleString());
	this.delete(table, "initialized_table_at");
	return true;
}