const { getSpreadSheetValues } = require('./googleSheetsService.js');

async function leaderboardData({auth, spreadsheetId, spreadsheetTab}) {
  const sheetName = spreadsheetTab;
  const response = await getSpreadSheetValues({
    spreadsheetId,
    sheetName,
    auth
  });
  const { values } = response.data;
  const columns = values[0];
  const categories = values[1];
  const points = values[2];
  const scores = values
    .slice(3)
    .filter(row => row[0] !== '')
    .map(row => row.map((cell, index) => {
      if (index === 0) {
        return new Date(cell);
      }

      if (index === row.length - 1) {
        return parseFloat(cell);
      }

      if (index > 1) {
        return parseInt(cell);
      }

      return cell;
    }))
    ;

    return {columns, categories, points, scores};
}

module.exports = {
  leaderboardData
}

