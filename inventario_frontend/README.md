# Lightweight React Template for KAVIA

This project provides a minimal React template with a clean, modern UI and minimal dependencies.

## Features

- Lightweight: Pure React + CSS (no external UI frameworks)
- Consistent theme via CSS variables (design tokens)
- Responsive layout with fixed sidebar and top header
- Accessible focus rings and states

## Getting Started

In the project directory, you can run:

### `npm start`
Runs the app in development mode.  
Open http://localhost:3000 to view it in your browser.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.

## Theme and Styling

A centralized theme using CSS variables is defined in `src/App.css` under the `:root` selector.

Key tokens:
- Colors:  
  --primary: #3b82f6, --success: #06b6d4, --secondary: #64748b, --error: #EF4444  
  --bg: #f9fafb, --surface: #ffffff, --text: #111827, --border: #e5e7eb
- Typography:  
  --font-sans (Inter/system font), --text-sm, --text-md, --text-lg, --line
- Spacing:  
  --space-1/2/3/4/6 = 4/8/12/16/24 px
- Radius:  
  --radius-sm/md/lg/xl = 6/8/10/12 px
- Shadows:  
  --shadow-sm/md/lg

Base components:
- Buttons: `.btn`, `.btn-primary`, `.btn-success`, `.btn-danger`, `.btn-ghost`
- Inputs: `.input`, `.select`
- Cards: `.card`
- Layout: `.app-shell`, `.app-sidebar`, `.app-header`, `.app-content`
- Utilities: `.grid`, `.grid-2/3/4`, spacing helpers (e.g., `.mb-3`, `.gap-2`)

Accessibility:
- Focus states use visible rings on interactive elements.
- Hover/active/disabled states provided for buttons and inputs.
- Colors maintain AA contrast on primary and error surfaces.

### Extending the theme
To adjust branding or add scales:
1. Edit tokens in `:root` inside `src/App.css`.
2. Use existing classes or create new variants following the same patterns.
3. Avoid hard-coded colors; reference tokens like `var(--primary)`.

## Project Conventions

- Do not introduce environment variables for styling.
- Avoid inline styles for colors; prefer theme tokens.
- Keep routes and API calls unchanged when modifying UI.

## Learn More

To learn React, check out the React documentation.

### Additional CRA docs
- Code splitting: https://facebook.github.io/create-react-app/docs/code-splitting
- Analyzing bundle: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size
- PWA: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app
- Advanced config: https://facebook.github.io/create-react-app/docs/advanced-configuration
- Deployment: https://facebook.github.io/create-react-app/docs/deployment
- Build minify troubleshooting: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
