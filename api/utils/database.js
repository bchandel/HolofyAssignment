'use strict';
const mongoose = require('mongoose');
const cache = require('memory-cache');
const utils = require('./dbUtils');
const bookSchema = require('../books/books-schema');
const config = require('../../config/config.json');

mongoose.set('debug', function(collectionName, method, query, doc, options) {
  // console.info("mongo collection: %s method: %s %s", collectionName, method, JSON.stringify(query, null, 4));
});

module.exports = {
  loadSchemasPluginsTemplates: function(req, hbDB) {
    req.db = {
      Book: hbDB.model('Book', bookSchema.Book)
    };
  },
  getDBConnection: function(req, resp, next) {
    let dbPath = req.dbPath;
    console.log("dbPath",dbPath);
    let hbDB = cache.get(dbPath);
    if (!hbDB) {
      let options = {
        poolSize: 50,
        connectTimeoutMS: 30000,
        keepAlive: 300000
      };
      mongoose.Promise = global.Promise;
      hbDB = utils.dbConnection(dbPath, options);
      hbDB
        .once('openSet', () => console.log('Connected to db'))
        .on('error', function(err) {
          console.error(err);
          console.error('connection error:', req.headers.database);
        })
        .on('disconnected', function() {
          console.error('connection disconnected:', req.headers.database);
        });
      cache.put(dbPath, hbDB, 60 * 60 * 1000);
      this.loadSchemasPluginsTemplates(req, hbDB);
    } else {
      hbDB = cache.get(dbPath);
      this.loadSchemasPluginsTemplates(req, hbDB);
    }
    req.db = hbDB.models;
    next();
  }
};
