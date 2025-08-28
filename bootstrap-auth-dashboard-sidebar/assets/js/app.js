
// ===== Archiwiz App JS =====

// Theme handling using Bootstrap 5.3 data-bs-theme
const THEME_KEY = "awz_theme";

function applyTheme(theme) {
  document.documentElement.setAttribute("data-bs-theme", theme);
  localStorage.setItem(THEME_KEY, theme);
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (prefersDark ? 'dark' : 'light'));
  updateThemeToggleIcon();
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-bs-theme") || "light";
  applyTheme(current === "light" ? "dark" : "light");
  updateThemeToggleIcon();
  showToast(`Switched to ${document.documentElement.getAttribute('data-bs-theme')} mode`, 'info');
}

function updateThemeToggleIcon() {
  document.querySelectorAll('#themeToggle i').forEach(icon => {
    const current = document.documentElement.getAttribute("data-bs-theme") || "light";
    icon.className = current === "light" ? "bi bi-moon-stars-fill" : "bi bi-brightness-high-fill";
  });
}

function wireThemeButtons() {
  document.querySelectorAll('#themeToggle').forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });
}

// Show Bootstrap toast programmatically
function showToast(message, type='primary') {
  const container = document.getElementById('toastContainer');
  const id = 't' + Math.random().toString(36).slice(2);
  const iconByType = {
    primary: 'bell',
    success: 'check-circle',
    danger: 'exclamation-triangle',
    warning: 'exclamation-circle',
    info: 'info-circle',
    secondary: 'info-circle'
  };
  const icon = iconByType[type] || 'bell';

  const el = document.createElement('div');
  el.className = 'toast align-items-center border-0 show';
  el.role = 'alert'; el.ariaLive = 'assertive'; el.ariaAtomic = 'true';
  el.id = id;
  el.innerHTML = `
    <div class="toast-body d-flex gap-2 align-items-center bg-${type}-subtle text-${type}-emphasis rounded">
      <i class="bi bi-${icon}"></i>
      <div class="flex-grow-1">${message}</div>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>`;
  container.appendChild(el);
  const t = new bootstrap.Toast(el, { delay: 3000 });
  t.show();
  el.addEventListener('hidden.bs.toast', () => el.remove());
}

// Form helpers
function wireFormValidation(form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      showToast('Please fix the errors in the form.', 'warning');
      return;
    }
    // Demo: fake success
    showToast('Form submitted successfully!', 'success');
  });
}

function wirePasswordToggles() {
  document.querySelectorAll('[data-action="toggle-password"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetSel = btn.getAttribute('data-target');
      const input = document.querySelector(targetSel);
      if (!input) return;
      const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
      input.setAttribute('type', type);
      btn.querySelector('i').className = type === 'password' ? 'bi bi-eye' : 'bi bi-eye-slash';
    });
  });
}

// Password strength: simple heuristic
function wirePasswordStrength() {
  const input = document.getElementById('signupPassword');
  const bar = document.getElementById('passwordStrengthBar');
  if (!input || !bar) return;
  input.addEventListener('input', () => {
    const v = input.value;
    let score = 0;
    if (v.length >= 8) score += 25;
    if (/[A-Z]/.test(v)) score += 25;
    if (/[0-9]/.test(v)) score += 25;
    if (/[^A-Za-z0-9]/.test(v)) score += 25;
    bar.style.width = score + '%';
    bar.className = 'progress-bar';
    if (score < 50) bar.classList.add('bg-danger');
    else if (score < 75) bar.classList.add('bg-warning');
    else bar.classList.add('bg-success');
  });
}

// Confirm password match
function wireConfirmPassword(confirmSelector, originalSelector) {
  const confirm = document.querySelector(confirmSelector);
  const original = document.querySelector(originalSelector);
  if (!confirm || !original) return;
  function validate() { confirm.setCustomValidity(confirm.value === original.value ? '' : 'Passwords do not match'); }
  confirm.addEventListener('input', validate);
  original.addEventListener('input', validate);
}

// OTP fields auto-advance
function wireOtpInputs() {
  const inputs = document.querySelectorAll('.code-input');
  if (!inputs.length) return;
  inputs.forEach((inp, idx) => {
    inp.addEventListener('input', () => {
      inp.value = inp.value.replace(/\D/g, '').slice(0,1);
      if (inp.value && idx < inputs.length - 1) inputs[idx+1].focus();
    });
    inp.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !inp.value && idx > 0) inputs[idx-1].focus();
    });
  });
}

// Sidebar toggles (mobile)
function wireSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const toggles = [document.getElementById('sidebarToggle'), document.getElementById('sidebarToggle2')].filter(Boolean);
  toggles.forEach(btn => btn.addEventListener('click', () => {
    sidebar.classList.toggle('show');
  }));
}

// Page-specific wiring
function pageInit() {
  initTheme();
  wireThemeButtons();
  wirePasswordToggles();
  wireOtpInputs();
  wireSidebar();

  // Auth pages
  const loginForm = document.getElementById('loginForm');
  if (loginForm) wireFormValidation(loginForm);

  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    wireFormValidation(signupForm);
    wirePasswordStrength();
    wireConfirmPassword('#confirmPassword', '#signupPassword');
  }

  const forgotForm = document.getElementById('forgotForm');
  if (forgotForm) wireFormValidation(forgotForm);

  const verifyForm = document.getElementById('verifyForm');
  if (verifyForm) {
    verifyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Email verified! Redirecting to dashboard...', 'success');
      setTimeout(() => window.location.href = 'dashboard.html', 500);
    });
    const resend = document.getElementById('resendCode');
    if (resend) resend.addEventListener('click', (e) => { e.preventDefault(); showToast('Verification code resent!', 'info'); });
  }

  // App pages
  const profileForm = document.getElementById('profileForm');
  if (profileForm) wireFormValidation(profileForm);

  const passwordForm = document.getElementById('passwordForm');
  if (passwordForm) {
    wireFormValidation(passwordForm);
    wireConfirmPassword('#confirmNewPassword', '#newPassword');
  }
}

document.addEventListener('DOMContentLoaded', pageInit);
