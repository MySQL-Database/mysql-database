"use strict";

const mysql = require('promise-mysql');
const EventEmitter = require('events');
const errors = require('../errors/strings.js');

module.exports = async function(options){
	let me = this;
	me.db = await mysql.createPool(options);
	process.nextTick(() => me.emit("connected", me.db));
	return me;
}