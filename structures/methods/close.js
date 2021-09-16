"use strict";

module.exports = async function() {
  this.end(function (err) {
    throw new TypeError(err);
  )
}
