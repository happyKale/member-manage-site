const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Qaeldkah9./!",
  database: `d'amo_member_db`,
});

module.exports = db;
