"use strict";

const errors = require('../errors/strings.js');

module.exports = async function(table){
	if(!table || typeof table !== "string") throw new TypeError(errors.table.replace("{received}", typeof table));
	
	await this.query('CREATE TABLE IF NOT EXISTS `' + table + '` (`id` int(11) NOT NULL auto_increment, `key_name` LONGTEXT NULL, `value` LONGTEXT NULL, `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`))');
	return true;
}