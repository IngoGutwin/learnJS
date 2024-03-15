const app = document.querySelector('#app');

const API = 'api';

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
             <a href="./member/member.html">courses</a>
        </div>
        <div class="logged-in-icon" id="logged-in">logged-in = false</div>`
  );
}

loadHome();
