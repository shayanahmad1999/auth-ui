
# Archiwiz Bootstrap Auth + Dashboard UI

A clean, modern Bootstrap 5.3 UI kit including:
- Login, Sign Up, Forgot Password, Email Verification pages
- Dashboard with sidebar + topbar
- Profile & Settings (profile edit, preferences, change password)
- Dark/Light theme toggle (persists in `localStorage`)
- Bootstrap Toast alerts wired across pages
- Subtle animations and glassmorphism accents
- Professional folder structure

## Run
- Just open `index.html` in your browser.
- After sign in (demo), go to `dashboard.html` or `profile.html`.
- All actions are demo-only and show toasts by design.

## Structure
```text
bootstrap-auth-dashboard/
├── index.html                # Login
├── signup.html               # Sign Up
├── forgot-password.html      # Forgot Password
├── verify-email.html         # Email Verification
├── dashboard.html            # App Dashboard (with sidebar)
├── profile.html              # Profile & Settings
└── assets
    ├── css/style.css
    ├── js/app.js
    └── img/logo.svg
```

## Notes
- Uses Bootstrap 5.3 and Bootstrap Icons via CDN.
- No backend is included—wire forms to your APIs as needed.
- The theme toggle uses `data-bs-theme` (Bootstrap 5.3) and persists between pages.
