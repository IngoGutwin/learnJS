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
        console.error(err);
        reject(err);
      });
  });
}

/**
 * get user's password from database
 * @param {Object} userData
 * @returns {Object}
 */
function getPassword(username) {
  return new Promise((resolve, reject) => {
    createNewDbConnection().then((connection) => {
      connection
        .query('SELECT * FROM users WHERE username = ?', [username])
        .then((result) => {
          resolve(result[0]);
        })
        .catch((err) => {
          console.error(err);
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
function save({ username, hash, salt }) {
  let sqlQuery =
    'INSERT INTO users (username, hash, salt) VALUES (?, ?, ?)';
  let sqlParameters = [username, hash, salt];
  return new Promise((resolve, reject) => {
    createNewDbConnection()
      .then((connection) => {
        sendQuery(connection, sqlParameters, sqlQuery)
          .then((result) => {
            console.log('save result: ', result);
            resolve('User created!');
          })
          .catch((err) => {
            console.log(err);
            reject(err.message);
          });
      })
      .catch(() => {
        reject('There is a Problem with the Database.');
      });
  });
}

module.exports = {
  getPassword,
  save,
};
