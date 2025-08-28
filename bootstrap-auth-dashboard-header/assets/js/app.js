
(() => {
  const html = document.documentElement;
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  html.setAttribute('data-bs-theme', initialTheme);
  document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('page-loaded');

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeSwitch = document.getElementById('themeToggleSwitch');
    const applyTheme = (mode) => {
      html.setAttribute('data-bs-theme', mode);
      localStorage.setItem('theme', mode);
      if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) icon.className = mode === 'dark' ? 'bi bi-sun' : 'bi bi-moon-stars';
      }
      if (themeSwitch) themeSwitch.checked = (mode === 'dark');
    };
    applyTheme(initialTheme);
    if (themeToggle) themeToggle.addEventListener('click', () => {
      applyTheme(html.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark');
    });
    if (themeSwitch) themeSwitch.addEventListener('change', (e) => {
      applyTheme(e.target.checked ? 'dark' : 'light');
    });

    // Activate tooltips if any
    [...document.querySelectorAll('[data-bs-toggle="tooltip"]')].forEach(el => {
      new bootstrap.Tooltip(el);
    });

    // Toggle password visibility
    document.querySelectorAll('[data-toggle-password]').forEach(btn => {
      btn.addEventListener('click', () => {
        const sel = btn.getAttribute('data-toggle-password');
        const input = document.querySelector(sel);
        if (!input) return;
        input.type = input.type === 'password' ? 'text' : 'password';
        const icon = btn.querySelector('i');
        if (icon) icon.className = input.type === 'password' ? 'bi bi-eye' : 'bi bi-eye-slash';
      });
    });

    // Simple form demo handlers: prevent submit and show toast
    document.querySelectorAll('form[data-demo="true"]').forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        e.stopPropagation();
        form.classList.add('was-validated');

        // Custom simple validations for confirm passwords
        const confirm = form.querySelector('#signupConfirm, #newPwd2');
        const origin  = form.querySelector('#signupPassword, #newPwd');
        if (confirm && origin && confirm.value !== origin.value) {
          confirm.setCustomValidity('Passwords do not match');
        } else if (confirm) {
          confirm.setCustomValidity('');
        }

        if (!form.checkValidity()) return;

        // Decide message based on form id
        const id = form.id || '';
        const map = {
          loginForm: ['Logged in', 'Welcome back!', 'success', 'dashboard.html'],
          signupForm: ['Account created', 'Please verify your email to continue.', 'primary', 'verify-email.html'],
          forgotForm: ['Email sent', 'Password reset link has been sent.', 'info', 'verify-email.html'],
          profileForm: ['Profile updated', 'Your account info has been saved.', 'success', null],
          passwordForm: ['Password updated', 'Your password was changed.', 'warning', null],
        };
        const [title, msg, type, redirect] = map[id] || ['Success', 'Action completed.', 'success', null];
        showToast(title, msg, type);
        if (redirect) {
          setTimeout(() => { window.location.href = redirect; }, 800);
        }
      });
    });

    // Resend verification email button
    const resend = document.getElementById('resendEmailBtn');
    if (resend) {
      resend.addEventListener('click', () => showToast('Verification sent', 'Please check your inbox.', 'primary'));
    }

    // Mark nav active
    const path = location.pathname.split('/').pop();
    document.querySelectorAll('.navbar .nav-link').forEach(link => {
      if (link.getAttribute('href') === path) {
        link.classList.add('active');
      }
    });

    // If URL contains ?toast=... show it
    const params = new URLSearchParams(location.search);
    if (params.get('toast')) {
      showToast('Notice', params.get('toast'), params.get('type') || 'info');
    }
  });
})();

// Bootstrap Toast helper
function showToast(title, message, type='primary') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const wrapper = document.createElement('div');
  wrapper.className = 'toast align-items-center border-0';
  wrapper.setAttribute('role', 'alert');
  wrapper.setAttribute('aria-live', 'assertive');
  wrapper.setAttribute('aria-atomic', 'true');
  wrapper.innerHTML = `
    <div class="toast-header">
      <i class="bi bi-bell me-2 text-${type}"></i>
      <strong class="me-auto">${title}</strong>
      <small>just now</small>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      ${message}
    </div>
  `;
  container.appendChild(wrapper);
  const toast = new bootstrap.Toast(wrapper, { delay: 2500 });
  toast.show();
  wrapper.addEventListener('hidden.bs.toast', () => wrapper.remove());
}
