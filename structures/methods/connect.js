"use strict";

const mysql = require('promise-mysql');
const errors = require('../errors/strings.js');
const releases = require('git-releases');
require('colors');

module.exports = async function(options, checkUpdates){
	let me = this;
	me.db = await mysql.createPool(options);
	me.db.pool.getConnection((err,connection) => {
		if(err) throw err;
		me.emit("connected", connection);
	})
	if(checkUpdates === true){
		setInterval(async function(){
			let data = await releases("1TGDev", me.name, true);
			if(data !== me.version){
				console.log(me.name.brightYellow + " is outdated".brightYellow + "\nnpm i ".brightRed + me.name.brightRed);
			}
		}, 180000)
	}
	return me;
}