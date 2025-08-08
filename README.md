# Vedant CV (React + Vite + Tailwind)

A sleek, responsive CV/portfolio single-page app.

## Local dev
```bash
npm install
npm run dev
```
Open the URL Vite prints (usually http://localhost:5173).

## Build
```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages (workflow included)
1. Create a **new GitHub repo** and push this project.
2. In GitHub, go to **Settings → Pages** and set **Source: GitHub Actions**.
3. The provided workflow `.github/workflows/deploy.yml` will build and publish your site on every push to `main`.
4. Your site will appear at `https://<your-username>.github.io/<repo-name>/`.

If you use a custom domain, add `public/CNAME` with your domain inside.

## Editing content
Open `src/App.jsx` and update:
- `PROFILE` object (name, email, links, etc.)
- `EXPERIENCE` and `PROJECTS` arrays
- `SKILLS_RADAR` values (or remove the chart)
