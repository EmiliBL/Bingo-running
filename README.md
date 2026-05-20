# Running Bingo 🏃

A personal running tracker for two friends. Log your runs, collect stickers, notify each other automatically.

---

## Setup in VS Code

### 1. Install dependencies
```bash
cd running-bingo
npm install
npm start
```
App opens at http://localhost:3000

---

### 2. Add your photos
Drop two files into the `/public` folder:
- `emilie.jpg`
- `julie.jpg`

Circle-crop them first (or the app will crop them).

---

### 3. Add sticker images
Drop into `/public/stickers/`:
- `run_sticker.png` — shown when you log a run
- `break_sticker.png` — shown for rest days

Export these from your Figma sticker designs.

---

### 4. Set up EmailJS (free)
1. Go to https://www.emailjs.com and sign up
2. Connect your Gmail under **Email Services**
3. Create a template under **Email Templates** with these variables:
   - `{{to_name}}` — recipient name
   - `{{from_name}}` — your name
   - `{{message}}` — the run message
   - `{{sync_url}}` — the magic link (paste this as a button/link in the template)

**Example template body:**
```
Hey {{to_name}}!

{{message}}

Tap to sync the counter:
{{sync_url}}
```

4. Copy your **Service ID**, **Template ID**, and **Public Key**
5. Paste them into `src/config.js`

---

### 5. Configure users
In `src/config.js`:
- Set `CURRENT_USER` to `'emilie'` on your phone
- Set `CURRENT_USER` to `'julie'` on Julie's phone
- Fill in both email addresses

---

### 6. Deploy to Vercel
1. Push this folder to a GitHub repo
2. Go to https://vercel.com, sign up free
3. Click **New Project** → import your repo
4. Click **Deploy** — done
5. Share the URL with Julie

---

## How it works

| Action | What happens |
|---|---|
| Tap "I RAN TODAY" | Marks a run sticker on your card, emails Julie with a sync link, run counter +1 |
| Tap "Shit run, but did it" | Same as above but different message |
| Tap "Didn't feel like it" | Marks a break circle, emails Julie, counter unchanged |
| Julie taps link in email | Her app opens, your count syncs to her device |

---

## New month
At the start of each month, tap the "reset" button (dev mode only — move this to settings later) to clear the board.
