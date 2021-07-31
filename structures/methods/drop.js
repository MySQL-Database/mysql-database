"use strict";

const errors = require('../errors/strings.js');

module.exports = async function(table){
	if(!table) throw new TypeError(errors.table.replace("{received}", table));
	
	this.db.query("DROP TABLE " + table);
	return true;
}