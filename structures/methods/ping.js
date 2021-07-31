"use strict";

const errors = require('../errors/strings.js');

module.exports = async function(){
	let tables = await this.tables();
	if(!tables.length) throw new TypeError(errors.noTablesExisted);
	let ms = Date.now();
	await this.query("SELECT * from " + tables[0]);
	return Date.now() - ms;
}