import createMenu from './components/menu.js';
import warningMessage from './components/warningMessage.js';
import { baseUrl } from './settings/api.js';
import { saveToken, saveUser, getUser } from './utils/userStorage.js';

createMenu();

if (getUser()) {
  location.href = '/admin.html';
}

const form = document.querySelector('#loginForm');
const usernameInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const messageContainer = document.querySelector('#messageContainer');
const submitButton = document.querySelector('#submit');

form.addEventListener('submit', submitForm);

function submitForm(event) {
  event.preventDefault();

  messageContainer.innerHTML = '';
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (username.length < 2 && password.length < 2) {
    return warningMessage(
      'alert-warning',
      'Please enter username and password',
      '#messageContainer'
    );
  } else if (username.length < 2) {
    return warningMessage(
      'alert-warning',
      'Please enter username',
      '#messageContainer'
    );
  } else if (password.length < 2) {
    return warningMessage(
      'alert-warning',
      'Please enter password',
      '#messageContainer'
    );
  } else {
    tryLogin(username, password);
  }
}

async function tryLogin(username, password) {
  const url = baseUrl + '/auth/local';

  const data = JSON.stringify({
    identifier: username,
    password: password,
  });

  const options = {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.user) {
      submitButton.innerText = 'Logged in';
      warningMessage(
        'alert-success',
        'Successfully logged in',
        '#messageContainer'
      );
      saveToken(json.jwt);
      saveUser(json.user);

      location.href = '/admin.html';
    }

    if (json.error) {
      warningMessage(
        'alert-danger',
        'Invalid login details',
        '#messageContainer'
      );
    }
  } catch (error) {
    console.log(error);
    warningMessage('alert-danger', error, '#messageContainer');
  }
}
