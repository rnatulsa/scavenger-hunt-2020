const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');
const sheets = google.sheets('v4');
const SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/spreadsheets'
];

async function getAuthToken({credentials}) {
  const auth = new GoogleAuth({
    credentials,
    scopes: SCOPES
  });
  return auth.getClient();
}

async function getSpreadSheet({spreadsheetId, auth}) {
  return sheets.spreadsheets.get({
    spreadsheetId,
    auth,
  });
}

async function getSpreadSheetValues({spreadsheetId, auth, sheetName}) {
  return sheets.spreadsheets.values.get({
    spreadsheetId,
    auth,
    range: sheetName
  });
}

module.exports = {
  getAuthToken,
  getSpreadSheet,
  getSpreadSheetValues
}
