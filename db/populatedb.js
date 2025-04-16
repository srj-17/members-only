#!/usr/bin/env node

const { Client } = require("pg");
const bcrypt = require("bcryptjs");
const { argv } = require("node:process");

const SQL = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    username VARCHAR(255),
    password TEXT NOT NULL,
    membership_status TEXT NOT NULL,
    admin boolean DEFAULT false
);

CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    message TEXT,
    user_id INTEGER,
    timestamp timestamptz,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");
`;

const SQL1 = `
    INSERT INTO users (first_name, last_name, username, password, membership_status, admin)
    VALUES ('Saugat', 'Rijal', 'srj', $1, 'common', false);
    `;

const SQL2 = `
    INSERT INTO messages (message, user_id, timestamp)
    VALUES ('Log in to add messages and become a member to see my name! Find the hidden password to become a member!', 1, $1);
    `;

async function main() {
  console.log("sending...");
  if (!argv[2]) {
    console.log("Usage: npm run populate [URL_TO_DB]");
    return;
  }

  const url = new URL(argv[2]);
  const client = new Client({
    connectionString: url.toString(),
  });
  const password = await bcrypt.hash("helloandwelcome", 10);

  await client.connect();

  try {
    await client.query(SQL);
    await client.query(SQL1, [password]);
    await client.query(SQL2, [new Date()]);
  } catch (e) {
    console.error(e);
  } finally {
    await client.end();
    console.log("done");
  }
}

main();
