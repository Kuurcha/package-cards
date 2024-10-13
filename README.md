Тестовый проект как техническое задание для интервью.
<br/>
Отображает список npm пакетов, количество скачиваний, количество зависимостей этих пакетов.
<br/>
Позволяет фильтровать таблицу по названию пакета и подсвечивать подгруженные зависимости при наведении.
<br/>
<br/>
Тестировать с: 
<br/>
https://github.com/MrCelestis/mock-interview-api  

Необходимо добавить к серверу cors и разрешить запросы с данного приложения:
```js
  var cors = require('cors')
  app.use(cors({
      origin: '*',
      methods: ['GET', 'POST'], 
      allowedHeaders: ['Content-Type', 'Authorization'], 
  }));
```

Есть возможность заменить в api источник данных для отображения произвольно генерируемых пакетов.
<br/>
Тестовый пример:
```js
const dataset = fixedSample
```
Тестовый генерируемый пример:
```js
const dataset = createRandomSample(количество_пакетов)
```
