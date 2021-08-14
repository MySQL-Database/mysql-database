"use strict";

const set = require('lodash/set');
const errors = require('../errors/strings.js');

module.exports = async function (table, key, value, boolean) {
	if (!table) throw new TypeError(errors.table.replace("{received}", table));
	if (!key) throw new TypeError(errors.key.replace("{received}", key));
	if (value == null) throw new TypeError(errors.value.replace("{received}", value));

	await this.create(table);
	let keys
	let keys2

	if (boolean === true || undefined) {
		keys = key.split('.');
		keys2 = key.split('.');
		if (keys.length > 1) {
			key = keys.shift();
		}
	}

	if (boolean === false) {
		key = key
		keys2 = key
	}
	let data = await this.query({
		sql: "SELECT value FROM " + table + " WHERE `key_name` = ?",
		values: [key]
	});
	if (!data.length) {
		await this.query({
			sql: "INSERT INTO " + table + " (`key_name`, `value`) VALUES (?, ?)",
			values: [key, JSON.stringify({})]
		});
	}
	data = await this.get(table, key, boolean || true) || {};

	if (boolean === true || undefined) {
		if (keys2.length > 1 && typeof data === 'object') {
			if (boolean === false) {
				value = set(data, key, value, false);
			} else if (boolean === true || undefined) {
				value = set(data, keys.join("."), value, true);
			}
		} else if (keys2.length > 1) {
			throw new ReferenceError(errors.targetNotObject.replace("{key}", key));
		}
	}

	try {
		value = JSON.stringify(value);
	} catch (e) { }
	await this.query({
		sql: "UPDATE " + table + " SET `value` = ? WHERE `key_name` = ?",
		values: [value, key]
	});

	if (boolean === false) {
		return this.get(table, key, false);
	} else if (boolean === true || undefined) {
		return this.get(table, (keys2.length > 1) ? key + "." + keys.join(".") : key, true);
	}
}