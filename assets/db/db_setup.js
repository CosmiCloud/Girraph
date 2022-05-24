const util = require("util");
const exec = util.promisify(require("child_process").exec);
const sqlite3 = require("sqlite3").verbose();
const db = require("better-sqlite3")(`${__dirname}/../db/pubicdkg.db`, {
  verbose: console.log,
});

async function build_db() {
  try {
    await db.exec(
      "CREATE TABLE IF NOT EXISTS request_history (request VARCHAR PRIMARY KEY NOT NULL, date_last_used DATE, ip_used VARCHAR NOT NULL)"
    );
    await db.exec(
      "CREATE TABLE IF NOT EXISTS mailing_list (email VARCHAR PRIMARY KEY NOT NULL)"
    );

    await db.exec(
      "CREATE TABLE IF NOT EXISTS user_header (account VARCHAR PRIMARY KEY NOT NULL, alias VARCHAR, profile_pic VARCHAR, email VARCHAR)"
    );

    await db.exec(
      "CREATE TABLE IF NOT EXISTS txn_header (account VARCHAR NOT NULL, action VARCHAR, type VARCHAR, keywords VARCHAR,timestamp DATE, data_id VARCHAR, ual VARCHAR, blockchain VARCHAR, txn_hash VARCHAR)"
    );

    await db.close();
  } catch (e) {
    console.log(e);
    console.log("Database - BLAHRG");
  }
}
build_db();
