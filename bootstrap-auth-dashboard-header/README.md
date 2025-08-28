# Bootstrap Auth + Dashboard Starter

A beautiful, responsive UI built with **HTML + CSS + Bootstrap 5.3**, including:

- Login, Sign Up, Forgot Password, Email Verification
- Simple Dashboard
- Profile/Settings (account + security)
- **Dark/Light theme** (persisted)
- **Bootstrap Toast** alerts (wired via JS)
- Subtle **animations** and glassmorphism
- Clean, professional folder structure

## Structure
```
bootstrap-auth-dashboard-starter/
├── index.html              # Login
├── signup.html             # Sign Up
├── forgot-password.html    # Forgot Password
├── verify-email.html       # Email Verification
├── dashboard.html          # Dashboard
├── profile.html            # Profile/Settings
└── assets/
    ├── css/
    │   ├── main.css
    │   └── animations.css
    ├── js/
    │   └── app.js
    └── img/
        └── avatar.svg
```

## Run
Just open **index.html** (Login) in your browser, or use a static server for nicer routing:

## Notes
- Forms are demo-only (no backend). They validate and show toasts, and some actions **redirect** to the next page to simulate real flow.
- Theme toggle available in navbar and a switch (desktop). The choice is saved to `localStorage`.
- To trigger a toast from URL, use: `dashboard.html?toast=Hello&type=success`

Enjoy!
