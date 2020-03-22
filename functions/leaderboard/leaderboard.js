const { getAuthToken } = require('./googleSheetsService.js');
const { leaderboardData } = require('./data');
const { credentials, spreadsheetId } = require('./config');

async function main() {
  const auth = await getAuthToken({credentials});
  return await leaderboardData({auth, spreadsheetId});
}

function error(err, statusCode = 500) {
  return {
    body: err.toString(),
    headers: { 'Content-Type': 'application/json' },
    statusCode
  };
}

function ok(data, statusCode = 200) {
  return {
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
    statusCode
  };
}

exports.handler = async (_event, _context) => main().then(ok).catch(error);
