const pool = require("./pool");

async function getUsers() {
  const { rows } = await pool.query("SELECT * FROM users");
  return rows;
}

async function getMessages() {
  const { rows } = await pool.query(
    `SELECT messages.id AS message_id, messages.message, messages.timestamp,
      users.id as user_id, users.username, users.membership_status, users.admin
      FROM messages INNER JOIN users ON messages.user_id = users.id`,
  );
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

// message
async function addMessage(userId, message) {
  await pool.query(
    "INSERT INTO messages (message, user_id, timestamp) VALUES ($1, $2, $3)",
    [message, userId, new Date()],
  );
}

async function updateMembershipStatus(userId, status) {
  await pool.query("UPDATE users SET membership_status = $1 WHERE id = $2", [
    status,
    userId,
  ]);
}

async function createAdmin(userId) {
  await pool.query("UPDATE users SET admin = $1 WHERE id = $2", [true, userId]);
}

async function deleteMessage(messageId) {
  await pool.query("DELETE FROM messages WHERE id=$1", [messageId]);
}

module.exports = {
  getUsers,
  getMessages,
  getUserByName,
  addUser,
  addMessage,
  updateMembershipStatus,
  createAdmin,
  deleteMessage,
};
