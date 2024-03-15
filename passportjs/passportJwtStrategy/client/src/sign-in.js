import form from './html.elements.js';

const signUp = document.querySelector('#sign-up');

const signUpElements = {
  signUp: null,
  form: null,
  username: null,
  email: null,
  password: null,
  signUpBtn: null,
  loginBtn: null,
  loginLink: null,
  signUpLink: null,
  loadTargets: function() {
    this.signUp = document.querySelector('#sign-up');
    this.loginLink = signUp.querySelector('#login-link');
    this.signUpLink = signUp.querySelector('#sign-up-link');
    this.form = signUp.querySelector('#sign-up-form');
    this.username = this.form.querySelector('#username');
    this.email = this.form.querySelector('#email');
    this.password = this.form.querySelector('#password');
    this.signUpBtn = this.form.querySelector('#sign-up-btn');
    this.loginBtn = this.form.querySelector('#login-btn');
  },
};
const API = 'http://localhost:8080/user';

function signUpForm() {
  let signUpFormHTML = form.signUpFrom;
  return {
    formHTML: signUpFormHTML,
    addClickEvent: function() {
      signUpElements.loginLink.addEventListener('click', () =>
        loadHTML(loginForm)
      );
      signUpElements.signUpBtn.addEventListener('click', saveNewUser);
    },
  };
}

function loginForm() {
  let loginFormHtml = form.loginForm;

  return {
    formHTML: loginFormHtml,
    addClickEvent: function() {
      signUpElements.signUpLink.addEventListener('click', () =>
        loadHTML(signUpForm)
      );
      signUpElements.loginBtn.addEventListener('click', loginUser);
    },
  };
}

function loginUser(e) {
  e.preventDefault();
  fetch(`${API}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: signUpElements.username.value,
      password: signUpElements.password.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.ok) {
        localStorage.setItem('jwtToken', JSON.stringify(data));
      }
    });
}

function saveNewUser(e) {
  e.preventDefault();
  fetch(`${API}/sign-up-user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: signUpElements.username.value,
      email: signUpElements.email.value,
      password: signUpElements.password.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.ok) {
        alert(data.message);
        loadHTML(loginForm);
      } else {
        alert('Benutzer existiert bereits');
      }
    });
}

function loadHTML(targetForm) {
  signUp.innerHTML = '';
  let cbResult = targetForm();
  signUp.insertAdjacentHTML('afterbegin', cbResult.formHTML);
  signUpElements.loadTargets();
  cbResult.addClickEvent();
}

function loadApp() {
  const urlParams = new URLSearchParams(window.location.search);
  const type = urlParams.get('type');
  if (type === 'sign-up') {
    loadHTML(signUpForm);
  } else if (type === 'log-in') {
    loadHTML(loginForm);
  }

}

window.addEventListener('load', loadApp);
















