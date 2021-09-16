"use strict";

const EventEmitter = require('events');
const packageInfo = require('../../package.json');

module.exports = class MySQL extends EventEmitter{
	constructor(){ super() };
	name = packageInfo.name;
	version = packageInfo.version;
	connect = require('../methods/connect');
	query = require('../methods/query');
	get = require('../methods/get');
	set = require('../methods/set');
	push = require('../methods/push');
	includes = require('../methods/includes');
	pull = require('../methods/pull');
	add = require('../methods/add');
	sub = require('../methods/sub');
	subtract = require('../methods/sub');
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
	ping = require('../methods/ping');
	clear = require('../methods/clear');
	base_set = require('../methods/base_set');
	base_get = require('../methods/base_get');
	end = require('../methods/end');
}