/**
 * NEXIORA WAITLIST BACKEND
 * ------------------------
 * Deploy this as a Google Apps Script Web App bound to a Google Sheet.
 * It stores signups as rows and (optionally) sends a confirmation email
 * via Resend, using an API key stored in Script Properties (server-side,
 * never exposed to the browser).
 *
 * SETUP — see SETUP_INSTRUCTIONS.md for the full walkthrough.
 */

const SHEET_NAME = 'Waitlist';

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const data = JSON.parse(e.postData.contents);
    const email = (data.email || '').trim().toLowerCase();
    const company = (data.company || '').trim();
    const teamSize = (data.teamSize || '').trim();
    const language = (data.language || '').trim();

    if (!email || !isValidEmail(email)) {
      return jsonResponse({ status: 'error', message: 'Invalid email' });
    }

    const sheet = getSheet();
    const existingRow = findRowByEmail(sheet, email);

    if (existingRow) {
      return jsonResponse({ status: 'ok', already: true, position: existingRow - 1 });
    }

    sheet.appendRow([
      new Date(),
      email,
      company,
      teamSize,
      language
    ]);

    const position = sheet.getLastRow() - 1; // minus header row

    // Fire-and-forget confirmation email — never blocks the signup if it fails
    try {
      sendConfirmationEmail(email);
    } catch (emailErr) {
      // Swallow email errors so a Resend hiccup never breaks the signup itself
    }

    return jsonResponse({ status: 'ok', already: false, position: position });

  } catch (err) {
    return jsonResponse({ status: 'error', message: err.message });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  const action = e.parameter.action;
  if (action === 'count') {
    const sheet = getSheet();
    const count = Math.max(sheet.getLastRow() - 1, 0); // minus header row
    return jsonResponse({ status: 'ok', count: count });
  }
  return jsonResponse({ status: 'error', message: 'Unknown action' });
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['Timestamp', 'Email', 'Company', 'Team Size', 'Preferred Language']);
  }
  return sheet;
}

function findRowByEmail(sheet, email) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return null;
  const emails = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
  for (let i = 0; i < emails.length; i++) {
    if (String(emails[i][0]).trim().toLowerCase() === email) {
      return i + 2; // actual sheet row number
    }
  }
  return null;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sendConfirmationEmail(toEmail) {
  const apiKey = PropertiesService.getScriptProperties().getProperty('RESEND_API_KEY');
  if (!apiKey) return; // not configured yet — skip silently

  const fromAddress = PropertiesService.getScriptProperties().getProperty('FROM_EMAIL') || 'onboarding@resend.dev';

  const payload = {
    from: fromAddress,
    to: toEmail,
    subject: "You're on the Nexiora waitlist",
    html: '<p>Thanks for joining the Nexiora Technologies waitlist. We\'ll reach out soon to schedule your discovery call.</p>'
  };

  UrlFetchApp.fetch('https://api.resend.com/emails', {
    method: 'post',
    contentType: 'application/json',
    headers: { Authorization: 'Bearer ' + apiKey },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
