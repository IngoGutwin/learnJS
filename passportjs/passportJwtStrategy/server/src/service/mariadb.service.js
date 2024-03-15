require('dotenv').config();
const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 100,
});

console.log('Total connections: ', pool.totalConnections());
console.log('Active connections: ', pool.activeConnections());
console.log('Idle connections: ', pool.idleConnections());

/**
 * Creates a new database connection using a Promise.
 *
 * @function
 * @async
 * @returns {Promise<Connection>} A Promise that resolves with a database connection.
 * @throws {Error} Throws an error if there is an issue creating the database connection.
 * @example
 *  resolve a pool connection in Promise
 * @returns {Promise}
 */
function createNewDbConnection() {
  return new Promise((resolve, reject) => {
    pool
      .getConnection()
      .then((connection) => {
        resolve(connection);
      })
      .catch((err) => {
        console.error(err);
        reject();
      });
  });
}
module.exports = {
  pool,
  createNewDbConnection,
};
