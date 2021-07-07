"use strict";

const mysql = require('promise-mysql');
const EventEmitter = require('events');
const errors = require('../errors/strings.js');

module.exports = class MySQL extends EventEmitter{
	constructor(){ super() };
	name = require('../../package.json').name;
	version = require('../../package.json').version;
	connect = require('../methods/connect');
	query = require('../methods/query');
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
	create = require('../methods/create');
	drop = require('../methods/drop');
	variables = require('../methods/variables');
	process = require('../methods/process');
}