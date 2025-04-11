const { Pool } = require("pg");

// create a pool with default settings
// from .env
module.exports = new Pool();
