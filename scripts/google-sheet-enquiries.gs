/**
 * Measure Ceramics — business enquiries → this Google Sheet.
 *
 * Setup (once):
 *   1. Open the Google Sheet → Extensions → Apps Script.
 *   2. Replace everything in Code.gs with this file and save.
 *   3. Deploy → New deployment → type "Web app".
 *        Execute as: Me    ·    Who has access: Anyone
 *   4. Copy the Web app URL (ends in /exec) and set it as SHEET_WEBHOOK_URL on Vercel.
 *
 * The website's server is the only caller; visitors never see this URL.
 */

const SHEET_NAME = "Enquiries";
const HEADERS = ["التاريخ", "المنشأة", "نبذة عن المشروع", "الجوال", "الصفحة", "اللغة"];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse(e.postData.contents);
    const book = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = book.getSheetByName(SHEET_NAME) || book.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }
    sheet.appendRow([
      new Date(),
      text(data.business),
      text(data.brief),
      "'" + String(data.phone || ""), // keep the leading 0
      text(data.page),
      data.lang === "en" ? "English" : "العربية",
    ]);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Stop anything typed into the form from being run as a spreadsheet formula.
function text(v) {
  const s = String(v || "");
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
