"use strict";

const get = require('lodash/get');
const errors = require('../errors/strings.js');

module.exports = async function (table, key, boolean) {
	if (!table) throw new TypeError(errors.table.replace("{received}", table));
	if (!key) throw new TypeError(errors.key.replace("{received}", key));
	let keys
	let keys2

	if (boolean === true) {
		keys = key.split('.');
		keys2 = key.split('.');
		if (keys.length > 1) {
			key = keys.shift();
		}
	}


	if (boolean === false || undefined) {
		key = key
		keys2 = key
	}
	let res = await this.query({
		sql: "SELECT value FROM " + table + " WHERE `key_name` = ?",
		values: [key]
	});
	if (!res.length) return null;
	let value = null;
	if (res.length) {
		value = res[0].value;
		if (!isNaN(value)) {
			value = Number(value);
		}
		try {
			value = JSON.parse(value);
		} catch (e) { }
	}
	if (keys2.length > 1 && typeof value === 'object') {
		if (boolean === false || undefined) {
			value = get(value, key);
		} else if (boolean === true) {
			value = get(value, keys.join("."));
		}
		if (value == undefined) value = null;
	} else if (keys2.length > 1) {
		throw new ReferenceError(errors.targetNotObject.replace("{key}", key));
	}
	return value;
}