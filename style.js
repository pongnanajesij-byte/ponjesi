const formContainer = document.getElementById('formContainer');
const usersContainer = document.getElementById('usersContainer');
const registerBtn = document.getElementById('registerBtn');
const backBtn = document.getElementById('backBtn');
const usersList = document.getElementById('usersList');

let users = JSON.parse(localStorage.getItem('users')) || [];

displayUsers();

function validateForm(name, email, password) {
  let valid = true;
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');

  nameError.textContent = '';
  emailError.textContent = '';
  passwordError.textContent = '';

  if(name.length < 3) {
    nameError.textContent = 'Name must be at least 3 characters';
    valid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailRegex.test(email)) {
    emailError.textContent = 'Enter a valid email address';
    valid = false;
  } else if(users.some(u => u.email === email)) {
    emailError.textContent = 'Email is already registered';
    valid = false;
  }

  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
  if(password.length < 6) {
    passwordError.textContent = 'Password must be at least 6 characters';
    valid = false;
  } else if(!specialCharRegex.test(password)) {
    passwordError.textContent = 'Password must contain at least 1 special character';
    valid = false;
  }

  return valid;
}

function displayUsers() {
  usersList.innerHTML = '';
  if(users.length === 0) {
    usersList.innerHTML = '<p>No users registered yet.</p>';
  } else {
    users.forEach((user) => {
      const div = document.createElement('div');
      div.classList.add('user-card');
      div.innerHTML = `
        <strong>${user.name}</strong>
        <span>${user.email}</span>
        <span>${user.createdAt}</span>
      `;
      usersList.appendChild(div);
    });
  }
}

registerBtn.addEventListener('click', () => {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if(validateForm(name,email,password)) {
    const newUser = { name, email, password, createdAt: new Date().toLocaleString() };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    displayUsers();
    formContainer.style.display = 'none';
    usersContainer.style.display = 'block';
  }
});

backBtn.addEventListener('click', () => {
  formContainer.style.display = 'block';
  usersContainer.style.display = 'none';
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('password').value = '';
});
