//forcing to declare variables
'use strict';

/**
 * require function to import module
 */
const mysql = require('mysql');

/**
 * require function to import module
 */
const db = require("../config/db");

/**
 * connectionPool for creating a certain number of connections saving mySQL configuration to <connectionPool> variable for shorter syntax usage
 */
const connectionPool = {

    pool: null,

    //initiating function with the property of connection pool to mySQL database
    init: function(){
        this.pool = mysql.createPool(db);
    },

    getPool: function() {
        return this.pool;
    }
}

module.exports = connectionPool;