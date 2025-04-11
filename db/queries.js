const pool = require("./pool");

async function getUsers() {
  const { rows } = await pool.query("SELECT * FROM users");
  return rows;
}

async function getMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

async function getUserByName(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  const user = rows[0];

  return user;
}

async function addUser(
  first_name,
  last_name,
  username,
  password,
  membership_status,
) {
  await pool.query(
    "INSERT INTO users (first_name, last_name, username, password, membership_status) VALUES ($1, $2, $3, $4, $5)",
    [first_name, last_name, username, password, membership_status],
  );
}

module.exports = {
  getUsers,
  getMessages,
  getUserByName,
  addUser,
};
