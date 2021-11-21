"use strict";

const errors = require('../errors/strings.js');

module.exports = async function(table, number){
	if(!table || typeof table !== "string") throw new TypeError(errors.table.replace("{received}", typeof table));
	if(number == null || typeof number !== "number") throw new TypeError(errors.number.replace("{received}", typeof number));
	if(isNaN(number) || number < 1) throw new TypeError(errors.numberType.replace("{received}", typeof number));
	
	await this.query(`ALTER TABLE ${table} AUTO_INCREMENT = ${number};`);
	let res = await this.stats(table);
	return res.Auto_increment;
}