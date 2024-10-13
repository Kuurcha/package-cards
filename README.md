Тестовый проект как техническое задание.
Тестировать с: 
https://github.com/MrCelestis/mock-interview-api  

Необходимо добавить к серверу cors и разрешить запросы с данного приложения:
  var cors = require('cors')
  app.use(cors({
      origin: '*',
      methods: ['GET', 'POST'], 
      allowedHeaders: ['Content-Type', 'Authorization'], 
  }));
