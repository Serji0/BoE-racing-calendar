//const SHEET_ID = '1YFnfmaWgGu1lD06Q-xzWgPIt5BQUU7Ipp26dBdlfqpk'; // Вставьте ID вашей таблицы
const SHEET_ID = '1mUZ0C5fG8tn_hoKML18jwH2_xSsZOHz5NIuh-25Fx94'; // Вставьте ID вашей таблицы1
const API_KEY = 'AIzaSyCJOgV4PwEtxfcxuhTHR0lTKIvcC2cvzcE'; // Вставьте ваш Google API Key
const URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Лист1?key=${API_KEY}`;


// Функция для получения названия дня недели
function getDayOfWeek(date) {
  const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  return days[date.getDay()];
}


fetch(URL)
  .then(response => response.json())
  .then(data => {
    const rows = data.values.slice(1); // Убираем заголовки, загружаем все строки
    const container = document.querySelector('#sheet-data');
    const filterInput = document.querySelector('#date-filter');
    
    // Инициализация фильтра по умолчанию
    const today = formatDate(new Date());
    filterRowsByDate(today, rows); // Фильтруем строки по текущей дате

    const picker = new Pikaday({
      field: document.getElementById('date-filter'),
      format: 'DD.MM.YYYY',  // Формат отображаемой даты
      onSelect: function(date) {
        const dayOfWeek = getDayOfWeek(date);  // Получаем день недели
        const formattedDate = formatDate(date);  // Форматируем дату как dd.mm.yyyy
        document.getElementById('date-filter').value = formattedDate;
        filterRowsByDate(formattedDate, rows);
      }
    });

    // Устанавливаем текущую дату как значение по умолчанию
    const todayDate = new Date();
    //picker.setDate(todayDate);
    filterInput.value = formatDate(todayDate);

    // Функция для преобразования строки в дату в формате DD.MM.YYYY
    function parseDate(dateString) {
      const [day, month, year] = dateString.split('.').map(num => parseInt(num, 10));
      return new Date(year, month - 1, day); // Месяцы в JavaScript начинаются с 0
    }

    // Функция для форматирования даты в строку YYYY-MM-DD
    function formatDate(date) {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Добавляем ведущий ноль
      const day = date.getDate().toString().padStart(2, '0'); // Добавляем ведущий ноль
      const dayOfWeek = getDayOfWeek(date);
      return `${dayOfWeek}, ${day}.${month}.${year}`;
    }

    // Функция для получения сегодняшней даты в формате YYYY-MM-DD
    function getTodayDate() {
      const today = new Date();
      return formatDate(today);
    }

    // Функция для фильтрации строк по выбранной дате
    function filterRowsByDate(selectedDate, rows) {
      const listItems = document.querySelectorAll('.list-item-container');

      listItems.forEach((item, index) => {
        const row = rows[index];
        const rowDateString = row[2]; // Дата из 3-й колонки
        const rowDate = parseDate(rowDateString);
        const formattedRowDate = formatDate(rowDate);

        if (selectedDate === '' || formattedRowDate === selectedDate) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    }
    
    // Функция для отображения таблицы под соответствующей строкой списка
    function toggleTableVisibility(rowIndex) {
      const tableWrappers = container.querySelectorAll('.table-wrapper');
      const tableWrapper = tableWrappers[rowIndex];

      // Если таблица скрыта, показываем её
      if (tableWrapper.style.display === 'none' || tableWrapper.style.display === '') {
        tableWrapper.style.display = 'block';
      } else {
        // Если таблица уже видна, скрываем её
        tableWrapper.style.display = 'none';
      }
    }
    
    // Функция для отображения таблицы под соответствующей строкой списка
    function toggleLinksVisibility(rowIndex) {
      const linksContainers = container.querySelectorAll('.linksContainer');
      const linksContainer = linksContainers[rowIndex];

      // Если таблица скрыта, показываем её
      if (linksContainer.style.display === 'none' || linksContainer.style.display === '') {
        linksContainer.style.display = 'block';
      } else {
        // Если таблица уже видна, скрываем её
        linksContainer.style.display = 'none';
      }
    }
    
    
    // Функция для отображения таблицы под соответствующей строкой списка
    function toggleBroadcastListVisibility(rowIndex) {
      const tableWrappers = container.querySelectorAll('.table-wrapper');
      const tableWrapper = tableWrappers[rowIndex];

      // Если таблица скрыта, показываем её
      if (tableWrapper.style.display === 'none' || tableWrapper.style.display === '') {
        tableWrapper.style.display = 'block';
      } else {
        // Если таблица уже видна, скрываем её
        tableWrapper.style.display = 'none';
      }
    }

    // Создаём контейнер для списка и обрамляем его
    const listContainer = document.createElement('div');
    listContainer.id = 'list-container'; // Добавляем id контейнера
    container.appendChild(listContainer); // Добавляем контейнер внутрь #sheet-data

    // Заполняем список
    rows.forEach((row, index) => {
      const listItem = document.createElement('li');
      
      // Добавляем border-top ко всем элементам, кроме первого
      if (index > 0) {
        listItem.style.borderTop = '2px solid #fbbd05';
      }
      
      // Создаем контейнер для двух колонок
      const rowContainer = document.createElement('div');
      rowContainer.classList.add('row-container');
      
      // Создаем контейнер для объединения eventName и audio
      const combinedColumn = document.createElement('div');
      combinedColumn.classList.add('column', 'column-left');
      
      // Первая часть (eventName)
      const eventName = document.createElement('span'); // Используем <span> для inline-стилизации
      eventName.classList.add('event-name'); // Добавляем класс для стилизации
      let column1Content = `${row[6] || ''}`;
      if (row[7]) {
        column1Content += `, ${row[7]}`;
      }
      if (row[8]) {
        column1Content += `, ${row[8]}`;
      }
      column1Content += `, ${row[9] || ''}`;
      eventName.textContent = column1Content;
      
      // Вторая часть (audio)
      const audio = document.createElement('span'); // Используем <span> для inline-стилизации
      audio.classList.add('audio-info'); // Добавляем класс для стилизации
      let audioContent = '';
      if (row[10] || row[11]) {
        // Если хотя бы один комментатор указан
        audioContent = ` | Комментаторы: ${row[10] || ''}`;
        if (row[11]) {
          audioContent += `, ${row[11]}`;
        }
      } else {
        // Если комментаторы не указаны
        audioContent = ' | Оригинальная дорожка';
      }
      audio.textContent = audioContent;
      
      // Создаём текст для добавления в начало строки
      const startText = document.createElement('span'); // Текст для добавления в начало
      startText.textContent = '[ТРАНСЛЯЦИЯ ОТМЕНЕНА] '; // Пример текста
      startText.style.color = 'red'; // Стили для начального текста
      startText.style.fontWeight = 'bold'; // Сделаем текст жирным
      
      // Добавляем eventName и audio в общий контейнер
      combinedColumn.appendChild(eventName);
      combinedColumn.appendChild(audio);
      if (row[1] === 'TRUE') {
        combinedColumn.insertBefore(startText, combinedColumn.firstChild)};
      
      // Вторая колонка: значение из колонки 4
      const startTime = document.createElement('div');
      startTime.classList.add('column', 'column-right');
      startTime.textContent = row[3] || ''; // Значение из колонки 4
      

      // Добавляем обе колонки в контейнер строки
      rowContainer.appendChild(combinedColumn);
      rowContainer.appendChild(startTime);

      // Добавляем контейнер строки в элемент списка
      listItem.appendChild(rowContainer);
      container.appendChild(listItem);

      
      listItem.dataset.rowIndex = index;
      listItem.classList.add('list-item');
      

      // Проверяем содержимое row[12] и создаём список ссылок
      const linksContainer = document.createElement('ul'); // Контейнер для ссылок
      linksContainer.style.display = 'none';
      linksContainer.style.marginTop = '5px'; // Добавляем отступ сверху
      linksContainer.classList.add('links-container');

      const platforms = row[12] || ''; // Проверяем row[12] на наличие данных

      // Если есть "BoE", добавляем ссылку на BoE
      if (platforms.includes('BoE')) {
        const boeLink = document.createElement('li');
        boeLink.innerHTML = `<a href="https://vk.com/be_on_edge" target="_blank" style="color: #fbbd05; text-decoration: none;">Ссылка на трансляцию VK</a>`;
        linksContainer.appendChild(boeLink);
      }

      // Если есть "TG", добавляем ссылку на TG
      if (platforms.includes('TG')) {
        const tgLink = document.createElement('li');
        tgLink.innerHTML = `<a href="https://vk.cc/cfjE8o" target="_blank" style="color: #fbbd05; text-decoration: none;">Ссылка на трансляцию TG</a>`;
        linksContainer.appendChild(tgLink);
      }

      // Если есть " BCU 1", " BCU 2" или " BCU 3", добавляем их без ссылок
      [' BCU 1', ' BCU 2', ' BCU 3'].forEach(platform => {
        if (platforms.includes(platform)) {
          const bcuItem = document.createElement('li');
          bcuItem.textContent = platform.trim(); // Добавляем без ссылки
          bcuItem.style.color = '#fbbd05'; // Стили текста
          linksContainer.appendChild(bcuItem);
        }
      });

      // Добавляем список ссылок в строку списка
      listItem.appendChild(linksContainer);

      // Добавляем строку в список
      listContainer.appendChild(listItem);

      // Контейнер для строки списка и таблицы
      const listItemContainer = document.createElement('div');
      listItemContainer.classList.add('list-item-container');
      
      listItemContainer.appendChild(listItem);
      
      // Создание таблицы
      //const tableWrapper = document.createElement('div');
      //tableWrapper.classList.add('table-wrapper');
      //const table = document.createElement('table');
      //table.classList.add('sheet-table');

      //const tr = document.createElement('tr');
      //row.forEach(cell => {
      //  const td = document.createElement('td');
      //  td.textContent = cell;
      //  tr.appendChild(td);
      //});
      //table.appendChild(tr);
      //tableWrapper.appendChild(table);

      // Добавляем таблицу в контейнер
      //listItemContainer.appendChild(tableWrapper);
      listContainer.appendChild(listItemContainer); // Добавляем item в новый контейнер списка

      // Добавляем обработчик клика для переключения видимости списка
      listItem.addEventListener('click', () => {
        if (linksContainer.style.display === 'none') {
          linksContainer.style.display = 'block'; // Показать список
        } else {
          linksContainer.style.display = 'none'; // Скрыть список
        }
      });
      
      // Добавляем обработчик клика на строку списка
      //listItem.addEventListener('click', () => {
      //  toggleTableVisibility(index);
      //});
      
      // Проверяем, завершена ли трансляция
      if (row[0] === 'TRUE') {
        listItem.classList.add('ended'); // Добавляем класс для затемнённых строк
      }
      
    });

    
    // Обработчик изменения фильтра по дате
    filterInput.addEventListener('change', (e) => {
      const selectedDate = e.target.value; // Получаем выбранную дату
      filterRowsByDate(selectedDate, rows);  // Передаем rows и выбранную дату в функцию фильтрации
    });
    
    // Инициализация фильтра по умолчанию
    filterRowsByDate(today, rows);  // Фильтруем по умолчанию

    // Обработчик для изменения даты на предыдущий день
    document.getElementById('prev-date').addEventListener('click', () => {
      const currentDateStr = filterInput.value.split(',')[1].trim();  // Получаем дату без дня недели (например, 06.01.2025)
      
      if (currentDateStr) {
        const currentDate = parseDate(currentDateStr); // Преобразуем строку в объект Date
        currentDate.setDate(currentDate.getDate() - 1); // Уменьшаем дату на 1 день
        const newDate = formatDate(currentDate); // Форматируем новую дату в строку
        //filterInput.value = newDate; // Обновляем значение в поле ввода
        picker.setDate(currentDate);
        filterRowsByDate(newDate, rows); // Применяем фильтрацию
      }
    });

    // Обработчик для изменения даты на следующий день
    document.getElementById('next-date').addEventListener('click', () => {
      const currentDateStr = filterInput.value.split(',')[1].trim();  // Получаем дату без дня недели (например, 06.01.2025)
      
      if (currentDateStr) {
        const currentDate = parseDate(currentDateStr); // Преобразуем строку в объект Date
        currentDate.setDate(currentDate.getDate() + 1); // Увеличиваем дату на 1 день
        const newDate = formatDate(currentDate); // Форматируем новую дату в строку
        //filterInput.value = newDate; // Обновляем значение в поле ввода
        picker.setDate(currentDate);
        filterRowsByDate(newDate, rows); // Применяем фильтрацию
      }
    });
  })
  .catch(error => console.error('Ошибка при загрузке данных:', error));

