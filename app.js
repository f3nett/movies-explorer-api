require('dotenv').config({ path: './config.env' });
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { loginRoutes, protectedRoutes } = require('./routes/index');
const { cors } = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const { wrongPathHandler, errHandler } = require('./middlewares/errhandler');
const { rateLimiter } = require('./middlewares/rateLimiter');
const { MONGODB_DEV } = require('./utils/dev-config');

const { PORT = 3000, NODE_ENV, MONGODB } = process.env;
const app = express();

app.enable('trust proxy');
app.use(helmet());
app.use(express.json());
app.use(cors);

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

// логгер запросов
app.use(requestLogger);

// ограничение на кол-во запросов от одного IP на единицу времени
app.use(rateLimiter);

// руты, не требующие авторизации
app.use(loginRoutes);

// авторизация
app.use(auth);

// руты, требующие авторизации
app.use(protectedRoutes);

// некорректный рут
app.use(wrongPathHandler);

// логгер ошибок
app.use(errorLogger);

// обработчики ошибок
app.use(errors());
app.use(errHandler);

// подключение к серверу mongo
async function main() {
  await mongoose.connect(NODE_ENV === 'production' ? MONGODB : MONGODB_DEV);

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

main();
