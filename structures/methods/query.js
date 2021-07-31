"use strict";

const errors = require('../errors/strings.js');

module.exports = async function(query){
	if(!query) throw new TypeError(errors.query.replace("{received}", query));
	
	return this.db.query(query);
}