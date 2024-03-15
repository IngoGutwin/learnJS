const app = document.querySelector('#app');

const API = 'api';

function authorisationHandler(e) {
  e.preventDefault();
  const tokenObject = JSON.parse(localStorage.getItem('jwtToken'));
  if (!tokenObject) {
    window.location.href = '/sign-in.html?type=log-in';
    return;
  }
  fetch('http://localhost:8080/member/member.html', {
    method: 'GET',
    headers: {
      Authorization: tokenObject.token,
    },
  }).then((response) => console.log(response));
}

function addEvents() {
  const memberLink = document.querySelector('#member-path');
  memberLink.addEventListener('click', authorisationHandler);
}

/**
 * @function
 * @param {Array} users
 * @returns {string} html value
 */
function loadHome() {
  app.insertAdjacentHTML(
    'afterbegin',
    `
        <h1 class="title" >JWT - Passport Auth</h1>
        <div class="info">
            <a href="./sign-in.html?type=sign-up">sign-up</a>
        </div>
        <div class="info">
            <a href="./sign-in.html?type=log-in">log-in</a>
        </div>
        <div class="info">
            <a href="./blog.html">blog</a>
        </div>
             <a id="member-path" href="#">courses</a>
        </div>
        <div class="logged-in-icon" id="logged-in">logged-in = false</div>`
  );
  addEvents();
}

loadHome();
