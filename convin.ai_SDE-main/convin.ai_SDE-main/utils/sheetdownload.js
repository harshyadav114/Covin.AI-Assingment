const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const generateAndDownloadExcel = (data, res) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'BalanceSheet');

  const filePath = path.join(__dirname, 'balanceSheet.xlsx');
  XLSX.writeFile(workbook, filePath);

  res.download(filePath, 'balanceSheet.xlsx', (err) => {
    if (err) {
      console.error('Error downloading the file:', err);
      res.status(500).send('Error downloading the file');
    } else {
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error('Error deleting the file:', unlinkErr);
        }
      });
    }
  });
};

module.exports = { generateAndDownloadExcel };
