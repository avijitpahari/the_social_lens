// script.js - Advanced Interactive Features
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({ duration: 800, once: true });

  // Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Auto-collapse menu when a link is clicked
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
      }
    });
  });

  // Form Handling
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', handleFormSubmit);
  });

  function handleFormSubmit(e) {
    e.preventDefault();
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    if (!validateForm(e.target)) return;

    submitBtn.classList.add('btn-loading');
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.classList.remove('btn-loading');
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      if (e.target.id === 'loginForm') {
        showToast('Login successful! Redirecting...', 'success');
        setTimeout(() => location.href = 'dashboard.html', 1500);
      } else if (e.target.id === 'analysisForm') {
        document.getElementById('results').classList.remove('d-none');
        document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
        initChart();
        showToast('Analysis complete!', 'success');
      }
    }, 2000);
  }

  function validateForm(form) {
    let valid = true;
    form.querySelectorAll('input[required]').forEach(input => {
      input.classList.remove('is-invalid');
      if (!input.value.trim() || 
          (input.type === 'email' && !/^\S+@\S+\.\S+$/.test(input.value))) {
        input.classList.add('is-invalid');
        valid = false;
      }
    });
    return valid;
  }

  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type === 'success' ? 'success' : 'danger'} border-0`;
    toast.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">${message}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    `;
    document.body.appendChild(toast);
    new bootstrap.Toast(toast, { delay: 3000 }).show();
    setTimeout(() => toast.remove(), 3500);
  }
});