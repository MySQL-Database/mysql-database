"use strict";

const mysql = require('promise-mysql');
const EventEmitter = require('events');
const errors = require('../errors/strings.js');

const colors = require('colors');
const releases = require('git-releases');

module.exports = async function(options){
	let me = this;
	me.db = await mysql.createPool(options);
	process.nextTick(() => me.emit("connected", me.db));
	setInterval(async function(){
		let data = await releases("1TGDev", me.name, true);
		if(data !== me.version){
			console.log(me.name.brightYellow + " is outdated".brightYellow + "\nnpm i ".brightRed + me.name.brightRed);
		}
	}, 180000)
	return me;
}