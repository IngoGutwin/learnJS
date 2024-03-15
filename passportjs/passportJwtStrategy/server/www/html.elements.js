const forms = {
  loginForm: `
        <div class="navigation">
            <a href="./index.html">home</a>
        </div>
        <h1>Log In</h1>
        <form id="sign-up-form">
            <div>
                <label for="username">Username</label>
                <input id="username" name="username" type="text" autocomplete="username" required />
            </div>
            <div>
                <label for="password">Password</label>
                <input id="password" name="password" type="password" autocomplete="current-password" required />
            </div>
            <div>
                <button id="login-btn">Log in</button>
            </div>
        </form>
        <button id="sign-up-link">no account yet? sign up here!</button>`,
  signUpFrom: `
            <div class="navigation">
                <a href="./index.html">home</a>
            </div>
        <h1>Sign-up</h1>
        <form id="sign-up-form">
            <label for="username">Username</label>
            <input id="username" name="username" placeholder="username" type="text" />
            <label for="email">E-Mail</label>
            <input id="email" id="email" placeholder="email" type="email" pattern=".+@example\.com" required />
            <label for="password">Password</label>
            <input id="password" name="password" placeholder="password" type="password" />
            <button id="sign-up-btn">Sign Up</button>
        </form> 
        <button id="login-link">already have an account? Log in here</button>`,
}

export default forms;

