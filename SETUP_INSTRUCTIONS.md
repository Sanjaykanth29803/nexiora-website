# Nexiora Waitlist Backend — Setup Guide

This connects your website's waitlist form to a Google Sheet (so you can see every
signup) and, optionally, sends a confirmation email through Resend — without ever
exposing your Resend API key in the website's code.

## 1. Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new blank sheet.
2. Rename it something like **"Nexiora Waitlist"**.
3. Leave it empty — the script will create the header row automatically.

## 2. Add the Apps Script

1. In the Sheet, go to **Extensions → Apps Script**.
2. Delete anything in the editor and paste the full contents of `waitlist-backend.gs`.
3. Click **Save** (the disk icon), name the project "Nexiora Waitlist Backend".

## 3. Add your Resend API key (kept private, server-side only)

1. In the Apps Script editor, click the **gear icon (Project Settings)** on the left.
2. Scroll to **Script Properties → Add script property**.
3. Add:
   - Property: `RESEND_API_KEY` → Value: your Resend key
   - Property: `FROM_EMAIL` → Value: an email address on a domain you've verified in Resend
     (or leave unset to use Resend's shared test address, `onboarding@resend.dev`,
     while testing)
4. Save.

**Important:** since you pasted your Resend key into our chat earlier, please rotate it
in the Resend dashboard first (Settings → API Keys → regenerate) and use the *new* key
here. Treat any key shared outside your own systems as compromised.

## 4. Deploy as a Web App

1. In the Apps Script editor, click **Deploy → New deployment**.
2. Click the gear next to "Select type" → choose **Web app**.
3. Settings:
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**. Google will ask you to authorize the script — approve it (it's
   your own script, accessing your own Sheet).
5. Copy the **Web app URL** it gives you — it looks like:
   `https://script.google.com/macros/s/XXXXXXXXXXXXXXXX/exec`

## 5. Connect it to your website

Open `nexiora-india.html`, find this line near the top of the `<script>` block:

```js
const WAITLIST_API_URL = ""; // <-- paste your Apps Script Web App URL here
```

Paste your Web App URL between the quotes. That's it — the form will now write real
rows to your Sheet, and the live counter will read the real row count.

## 6. Test it

1. Open the site, submit the waitlist form with a test email.
2. Check the Google Sheet — a new row should appear within a couple of seconds.
3. If you configured `RESEND_API_KEY`, check that inbox for the confirmation email.

## Notes & limits

- Every time you edit the script in Apps Script, you must create a **new deployment**
  (Deploy → Manage deployments → Edit → New version) for changes to go live — editing
  the code alone doesn't update the already-deployed URL's behavior.
- This setup comfortably handles a few thousand signups. If you outgrow it, the same
  Resend-key-stays-server-side pattern applies to any real backend (Airtable, Supabase,
  a small Node/Express server, etc.) — the Sheet is just the simplest place to start.
- Your Resend free tier has a sending limit (check your Resend dashboard for the current
  number) — fine for a waitlist, worth watching if it takes off.
