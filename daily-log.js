/**
 *  Module: mylog
 *  Author: Son Nguyen
 *  Date: Jul 05 2016
 *  Purpose: provide an easy way to log
 */

const cwd     = process.cwd();
const path    = require('path');
const mkdir   = require('mkdirp');
const winston = require('winston');
const mode    = process.env.NODE_ENV || 'development';
const info    = require(cwd + '/package.json');
const logDir  = cwd + '/logs';

// create log directory if not existing
mkdir.mkdirp(logDir);

const log = new winston.Logger({
   level     : 'verbose',
   colors    : {
      trace  : 'magenta',
      input  : 'grey',
      verbose: 'cyan',
      prompt : 'grey',
      debug  : 'blue',
      info   : 'green',
      data   : 'grey',
      help   : 'cyan',
      warn   : 'yellow',
      error  : 'red'
   },
   transports: [new (winston.transports.Console)({
      prettyPrint: true,
      colorize   : true,
      timestamp  : true
   }), new (require('winston-daily-rotate-file'))({
      filename   : info.name + '.' + mode + '.log',
      dirname    : logDir,
      json       : false,
      prepend    : true,
      prettyPrint: true
   })]
});

if (mode === 'production') {
   log.remove(winston.transports.Console);
   log.info('daily-log.js - Production mode, remove console transport');
} else {
   log.info('daily-log.js - Development mode, use both transport');
}

const Log = function Log(tag, show) {
   this.TAG  = path.basename(tag);
   this.show = show || true;
};

Log.prototype.info = function info(str, ...theArgs) {
   if (this.show) {
      log.info(this.TAG + ' - ' + str, ...theArgs);
   }
};

Log.prototype.warn = function warn(str, ...theArgs) {
   if (this.show) {
      log.warn(this.TAG + ' - ' + str, ...theArgs);
   }
};

Log.prototype.error = function error(str, ...theArgs) {
   if (this.show) {
      log.error(this.TAG + ' - ' + str, ...theArgs);
   }
};

Log.prototype.debug = function debug(str, ...theArgs) {
   if (this.show) {
      log.debug(this.TAG + ' - ' + str, ...theArgs);
   }
};

module.exports = function (tag, show) {
   return new Log(tag, show);
};
