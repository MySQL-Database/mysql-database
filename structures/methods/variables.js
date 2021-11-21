"use strict";

const errors = require('../errors/strings.js');

module.exports = async function(variables){
	if(!variables) throw new TypeError(errors.variables.replace("{received}", variables));
	if(typeof variables !== "object" || Array.isArray(variables)) throw new TypeError(errors.variablesNotObject.replace("{received}", typeof variables));
	
	let res = {};
	let keys = Object.keys(variables);
	for(var i = 0; i < keys.length; i++){
		let returned = await this.query(`SET GLOBAL ${keys[i]}=${variables[keys[i]]};`);
		if(!returned.message){
			res[keys[i]] = variables[keys[i]];
		}else{
			res[keys[i]] = returned;
		}
	}
	return res;
}