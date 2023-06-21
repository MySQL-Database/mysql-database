"use strict";

const errors = require('../errors/strings.js');

module.exports = async function(dbName){
	if(!dbName || typeof dbName !== "string") throw new TypeError(errors.databaseName.replace("{received}", typeof table));
	
	await this.db.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
	return true;
}