const SHEET_ID = '1YFnfmaWgGu1lD06Q-xzWgPIt5BQUU7Ipp26dBdlfqpk'; // Вставьте ID вашей таблицы
const API_KEY = 'AIzaSyCJOgV4PwEtxfcxuhTHR0lTKIvcC2cvzcE'; // Вставьте ваш Google API Key
const URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Лист1?key=${API_KEY}`;

fetch(URL)
  .then(response => response.json())
  .then(data => {
    const rows = data.values.slice(1); // Убираем заголовок
    const tableBody = document.querySelector('#data-table tbody');
    rows.forEach(row => {
      const tr = document.createElement('tr');
      row.forEach(cell => {
        const td = document.createElement('td');
        td.textContent = cell;
        tr.appendChild(td);
      });
      tableBody.appendChild(tr);
    });
  })
  .catch(error => console.error('Ошибка при загрузке данных:', error));
