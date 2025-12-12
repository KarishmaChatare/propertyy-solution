import { Case } from '../types';

export function getCaseRowStatus(reportOutdate: string, reportStatus: string): 'overdue' | 'due-soon' | 'normal' {
  if (reportStatus === 'Done') {
    return 'normal';
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const outcomeDate = new Date(reportOutdate);
  outcomeDate.setHours(0, 0, 0, 0);
  
  const diffTime = outcomeDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Older than 1 day (more than 1 day in the past)
  if (diffDays < -1) {
    return 'overdue';
  }
  
  // Yesterday or tomorrow (-1, 0, or 1)
  if (diffDays >= -1 && diffDays <= 1 && diffDays !== 0) {
    return 'due-soon';
  }

  return 'normal';
}

export function getOverdueCases(cases: Case[]): Case[] {
  return cases.filter(c => getCaseRowStatus(c.reportOutdate, c.reportStatus) === 'overdue');
}

export function getDueSoonCases(cases: Case[]): Case[] {
  return cases.filter(c => getCaseRowStatus(c.reportOutdate, c.reportStatus) === 'due-soon');
}

export function formatCurrency(amount: number): string {
  // Format as Indian Rupees
  const formatted = amount.toLocaleString('en-IN');
  return `₹${formatted}`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  
  return `${day} ${month} ${year}`;
}

export function exportToCSV(cases: Case[], filename: string = 'cases.csv') {
  const headers = [
    'Sr No',
    'Date',
    'Client Name',
    'Client Contact',
    'Valuer Name',
    'Bank Name',
    'Bank Person Name',
    'Visit Person',
    'Report Done By',
    'Valuation Payment',
    'Payment Status',
    'Payment Mode',
    'UTR Number',
    'Report Status',
    'Remark',
    'Report Outdate Date',
  ];

  const rows = cases.map(c => [
    c.srNo,
    c.date,
    c.clientName,
    c.clientContact,
    c.valuerName,
    c.bankName,
    c.bankPersonName,
    c.visitPerson,
    c.reportDoneBy,
    c.valuationPayment,
    c.paymentStatus,
    c.paymentMode,
    c.utrNumber || '',
    c.reportStatus,
    c.remark,
    c.reportOutdate,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}

export function exportToExcel(cases: Case[], filename: string = 'cases.xlsx') {
  // Create HTML table for Excel
  const headers = [
    'Sr No', 'Date', 'Client Name', 'Client Contact', 'Valuer Name',
    'Bank Name', 'Bank Person Name', 'Visit Person', 'Report Done By',
    'Valuation Payment', 'Payment Status', 'Payment Mode',
    'UTR Number', 'Report Status', 'Remark', 'Report Outdate Date'
  ];

  let htmlContent = '<table><thead><tr>';
  headers.forEach(header => {
    htmlContent += `<th style="background-color: #0052CC; color: white; padding: 10px; border: 1px solid #ddd;">${header}</th>`;
  });
  htmlContent += '</tr></thead><tbody>';

  cases.forEach(c => {
    htmlContent += '<tr>';
    htmlContent += `<td style="border: 1px solid #ddd; padding: 8px;">${c.srNo}</td>`;
    htmlContent += `<td style="border: 1px solid #ddd; padding: 8px;">${c.date}</td>`;
    htmlContent += `<td style="border: 1px solid #ddd; padding: 8px;">${c.clientName}</td>`;
    htmlContent += `<td style="border: 1px solid #ddd; padding: 8px;">${c.clientContact}</td>`;
    htmlContent += `<td style="border: 1px solid #ddd; padding: 8px;">${c.valuerName}</td>`;
    htmlContent += `<td style="border: 1px solid #ddd; padding: 8px;">${c.bankName}</td>`;
    htmlContent += `<td style="border: 1px solid #ddd; padding: 8px;">${c.bankPersonName}</td>`;
    htmlContent += `<td style="border: 1px solid #ddd; padding: 8px;">${c.visitPerson}</td>`;
    htmlContent += `<td style="border: 1px solid #ddd; padding: 8px;">${c.reportDoneBy}</td>`;
    htmlContent += `<td style="border: 1px solid #ddd; padding: 8px;">${c.valuationPayment}</td>`;
    htmlContent += `<td style="border: 1px solid #ddd; padding: 8px;">${c.paymentStatus}</td>`;
    htmlContent += `<td style="border: 1px solid #ddd; padding: 8px;">${c.paymentMode}</td>`;
    htmlContent += `<td style="border: 1px solid #ddd; padding: 8px;">${c.utrNumber || ''}</td>`;
    htmlContent += `<td style="border: 1px solid #ddd; padding: 8px;">${c.reportStatus}</td>`;
    htmlContent += `<td style="border: 1px solid #ddd; padding: 8px;">${c.remark}</td>`;
    htmlContent += `<td style="border: 1px solid #ddd; padding: 8px;">${c.reportOutdate}</td>`;
    htmlContent += '</tr>';
  });

  htmlContent += '</tbody></table>';

  const blob = new Blob([htmlContent], { type: 'application/vnd.ms-excel' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}

export function exportToPDF(cases: Case[], filename: string = 'cases.pdf') {
  // Create a printable HTML version
  const headers = [
    'Sr No', 'Date', 'Client Name', 'Contact', 'Valuer',
    'Bank', 'Bank Person', 'Visit Person', 'Report By',
    'Payment', 'Pay Status', 'Pay Mode',
    'UTR', 'Report Status', 'Remark', 'Outdate'
  ];

  let htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Propertyy Solutions</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { color: #0052CC; text-align: center; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 10px; }
        th { background-color: #0052CC; color: white; padding: 8px; border: 1px solid #ddd; text-align: left; }
        td { padding: 6px; border: 1px solid #ddd; }
        tr:nth-child(even) { background-color: #f9f9f9; }
        .footer { margin-top: 20px; text-align: center; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <h1 style="margin-bottom:4px;">Valuation Cases Report</h1>
<p style="text-align:center; margin-top:0;">Generated on ${formatDate(new Date().toISOString().split('T')[0])}</p>

      <table>
        <thead>
          <tr>
  `;

  headers.forEach(header => {
    htmlContent += `<th>${header}</th>`;
  });

  htmlContent += '</tr></thead><tbody>';

  cases.forEach(c => {
    htmlContent += '<tr>';
    htmlContent += `<td>${c.srNo}</td>`;
    htmlContent += `<td>${formatDate(c.date)}</td>`;
    htmlContent += `<td>${c.clientName}</td>`;
    htmlContent += `<td>${c.clientContact}</td>`;
    htmlContent += `<td>${c.valuerName}</td>`;
    htmlContent += `<td>${c.bankName}</td>`;
    htmlContent += `<td>${c.bankPersonName}</td>`;
    htmlContent += `<td>${c.visitPerson}</td>`;
    htmlContent += `<td>${c.reportDoneBy}</td>`;
    htmlContent += `<td>${formatCurrency(c.valuationPayment)}</td>`;
    htmlContent += `<td>${c.paymentStatus}</td>`;
    htmlContent += `<td>${c.paymentMode}</td>`;
    htmlContent += `<td>${c.utrNumber || '-'}</td>`;
    htmlContent += `<td>${c.reportStatus}</td>`;
    htmlContent += `<td>${c.remark}</td>`;
    htmlContent += `<td>${formatDate(c.reportOutdate)}</td>`;
    htmlContent += '</tr>';
  });

  htmlContent += `
      </tbody>
    </table>
    <div class="footer">
      <p>ValuationApp - Professional Valuation Management System</p>
    </div>
    <script>
      window.onload = function() {
        window.print();
      }
    </script>
    </body>
    </html>
  `;

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  }
}
