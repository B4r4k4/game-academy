# Game Academy · أكاديمية الألعاب

A bilingual (Arabic-first, RTL / English) game-design learning platform with user accounts and an admin panel.

## Run

```bash
npm install
npm start            # http://localhost:3000
```

On first run the server seeds all course content and creates an admin account.
Its login is printed in the console and saved to `data/initial-admin.txt`.
Sign in, change the password from **Account settings**, then delete that file.

To choose the admin yourself, set the account details before the first run:

```bash
ADMIN_EMAIL=you@example.com ADMIN_PASSWORD='a-strong-password' npm start
# or later:
node server/seed.js --admin you@example.com 'a-strong-password' "Your Name"
```

## Structure

| Path | What |
|---|---|
| `server/index.js` | Express API: auth, progress sync, content, admin endpoints, static files |
| `server/db.js` | SQLite (built-in `node:sqlite`), password hashing, sessions |
| `server/seed.js`, `server/seed/en.json`, `server/seed/ar.js` | Course content in English and Arabic |
| `public/` | The single-page app (`js/i18n.js`, `js/app.js` user pages, `js/admin.js` admin pages) |
| `images/` | Your artwork (served at `/images/…`) |
| `uploads/` | Images uploaded from the admin media library |
| `data/academy.db` | The database (users, progress, content, settings) |
| `tools/build-art.mjs` | Regenerates the animated SVG accents (hero scene, cast) |

## Design Studio AI assistant

The Design Studio (`#/studio`) is a 6-step drag & drop builder: genre → characters → levels → gameplay → world & style → pitch & export.
Each step has a **✨ Suggest with AI** button (signed-in users, 30 requests/hour each) powered by Claude Opus 5.5 via the Anthropic SDK.
It stays off until you give the server an API key:

```bash
ANTHROPIC_API_KEY=sk-ant-... npm start
# optional: STUDIO_AI_MODEL=claude-sonnet-5-5   (cheaper/faster)
```

Code: `public/js/studio.js` (builder + drag & drop), `public/css/studio.css`, `server/ai.js` (prompt + JSON schema), route `POST /api/studio/ai`.

## Admin panel

Log in as an admin, then open **Admin panel** from the avatar menu (or go to `/#/admin`):

- **Overview** — users, activity, completions, sign-ups.
- **Users** — make admin, disable, reset progress, set password, delete.
- **Modules & lessons** — edit every module, lesson and quiz question in Arabic and English side by side; reorder; publish/draft.
- **Gallery** — add, edit, reorder and hide gallery images with bilingual study notes.
- **Media library** — upload JPG/PNG/WebP/GIF (max 8 MB) and see where each image is used.
- **Settings** — site name, announcement bar, home-page cinematic reel, default language, open/close sign-ups.

Lesson bodies accept HTML and are shown to learners as written, so only give admin rights to people you trust.

To restore the original course content (users are kept): `node server/seed.js --reset`.

## Production notes

Set `NODE_ENV=production` so session cookies are marked `Secure`, and serve the app behind HTTPS.
Back up the `data/` and `uploads/` folders.
