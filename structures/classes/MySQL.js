"use strict";

const mysql = require('promise-mysql');
const EventEmitter = require('events');
const errors = require('../errors/strings.js');

module.exports = class MySQL extends EventEmitter{
	constructor(){
		super();
	}
	connect = require('../methods/connect');
	get = require('../methods/get');
	set = require('../methods/set');
	push = require('../methods/push');
	includes = require('../methods/includes');
	pull = require('../methods/pull');
	add = require('../methods/add');
	sub = require('../methods/sub');
	delete = require('../methods/delete');
	all = require('../methods/all');
	tables = require('../methods/tables');
	rename = require('../methods/rename');
	stats = require('../methods/stats');
	auto_increment = require('../methods/auto_increment');
	query = require('../methods/query');
	drop = require('../methods/drop');
	variables = require('../methods/variables');
	process = require('../methods/process');
}