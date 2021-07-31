"use strict";

const errors = require('../errors/strings.js');

module.exports = async function(){
	return this.db.query(`SHOW PROCESSLIST;`);
}