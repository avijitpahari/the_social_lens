const container = document.getElementById('main');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Desktop overlay
  document.getElementById('toSignUp')?.addEventListener('click', () => container.classList.add('right'));
  document.getElementById('toSignIn')?.addEventListener('click', () => container.classList.remove('right'));

  // Mobile toggles
  document.getElementById('mobileSignUp')?.addEventListener('click', () => container.classList.add('right'));
  document.getElementById('mobileSignIn')?.addEventListener('click', () => container.classList.remove('right'));

  // Show/Hide password
  document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', () => {
      const input = document.getElementById(icon.dataset.target);
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      icon.classList.toggle('fa-eye', !isPassword);
      icon.classList.toggle('fa-eye-slash', isPassword);
    });
  });

  // Validation helper
  function validateField(input, errorEl, condition, errorMsg) {
    const valid = condition(input.value);
    errorEl.style.display = input.value && !valid ? 'block' : 'none';
    return valid;
  }

  // === SIGN-UP ===
  const signupEmail = document.getElementById('signup-email');
  const signupPass = document.getElementById('signup-password');
  const confirmPass = document.getElementById('confirm-password');
  const emailError = document.getElementById('email-error');
  const passError = document.getElementById('password-error');
  const signupBtn = document.getElementById('signup-btn');
  const signupSuccess = document.getElementById('signup-success');

  function updateSignupBtn() {
    const emailOk = emailRegex.test(signupEmail.value);
    const passOk = signupPass.value && signupPass.value === confirmPass.value;
    signupBtn.disabled = !(emailOk && passOk);
  }

  signupEmail.addEventListener('input', () => {
    validateField(signupEmail, emailError, v => emailRegex.test(v), 'Invalid email');
    updateSignupBtn();
  });

  signupPass.addEventListener('input', updateSignupBtn);
  confirmPass.addEventListener('input', () => {
    validateField(confirmPass, passError, () => signupPass.value === confirmPass.value, "Passwords don't match");
    updateSignupBtn();
  });

  signupBtn.addEventListener('click', e => {
    e.preventDefault();
    signupSuccess.style.display = 'block';
    signupBtn.disabled = true;

    setTimeout(() => {
      container.classList.remove('right'); // Go to Sign-In
      signupSuccess.style.display = 'none';
      // Reset form
      document.querySelector('.sign-up-panel').querySelectorAll('input').forEach(i => i.value = '');
      updateSignupBtn();
    }, 1800);
  });

  // === SIGN-IN ===
  const signinEmail = document.getElementById('signin-email');
  const signinEmailError = document.getElementById('signin-email-error');
  const signinBtn = document.getElementById('signin-btn');
  const signinSuccess = document.getElementById('signin-success');

  signinEmail.addEventListener('input', () => {
    const valid = validateField(signinEmail, signinEmailError, v => emailRegex.test(v), 'Invalid email');
    signinBtn.disabled = !valid;
  });

  signinBtn.addEventListener('click', e => {
    e.preventDefault();
    signinSuccess.style.display = 'block';
    signinBtn.disabled = true;

    setTimeout(() => {
      window.location.href = 'dashboard.html'; // Redirect to dashboard
    }, 1000);
  });