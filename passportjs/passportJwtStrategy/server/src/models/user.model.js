const { v4: uuidV4 } = require('uuid');
const { createNewDbConnection } = require('../service/mariadb.service');

function sendQuery(connection, writableData, sqlQuery) {
  return new Promise((resolve, reject) => {
    connection
      .query(sqlQuery, writableData)
      .then((res) => {
        connection.end();
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * get user's password from database
 * @param {Object} userData
 * @returns {Object}
 */
function get(tableRow, rowValue) {
  return new Promise((resolve, reject) => {
    createNewDbConnection().then((connection) => {
      connection
        .query(`SELECT * FROM users WHERE ${tableRow} = ?`, [rowValue])
        .then((result) => {
          resolve(result[0]);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}

/**
 * Creates new user request using a Promise
 * @param {Object} userData
 * @returns {String} message
 */
function save(userData) {
  const newUser = Object.assign(userData);
  newUser.id = uuidV4();
  const userProperties = Object.keys(newUser);
  const userValues = Object.values(newUser);
  const sqlQuery = `INSERT INTO users (${userProperties.join(', ')}) VALUES (?, ?, ?, ?, ?)`;
  return new Promise((resolve, reject) => {
    createNewDbConnection()
      .then((connection) => {
        sendQuery(connection, userValues, sqlQuery)
          .then(() => {
            resolve('User created!');
          })
          .catch((err) => {
            reject(err.code);
          });
      })
      .catch((err) => {
        reject(err.code);
      });
  });
}

module.exports = {
  get,
  save,
};
