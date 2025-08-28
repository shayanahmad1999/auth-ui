// Bootstrap form validation + simple helpers
(() => {
  'use strict';
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      // Simple confirm-password check if present
      const newPw = form.querySelector('#newPassword');
      const confirm = form.querySelector('#confirmPassword');
      if (newPw && confirm) {
        if (newPw.value !== confirm.value) {
          confirm.setCustomValidity('Passwords must match');
        } else {
          confirm.setCustomValidity('');
        }
      }
      if (!form.checkValidity()) {
        event.preventDefault(); event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });

  // Toggle password visibility buttons
  document.querySelectorAll('[data-toggle="password"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      if (!input) return;
      input.type = input.type === 'password' ? 'text' : 'password';
      btn.textContent = input.type === 'password' ? 'Show' : 'Hide';
    });
  });
})();

// Utility: show toast by id
function showToast(id) { const toast = new bootstrap.Toast(document.getElementById(id)); toast.show(); }
