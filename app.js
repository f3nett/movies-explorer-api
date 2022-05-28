require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const usersRoutes = require('./routes/users');
const moviesRoutes = require('./routes/movies');
const { cors } = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const { wrongPathHandler, errHandler } = require('./middlewares/errhandler');
const { signinValidation, signupValidation } = require('./validation/signin');
const { login, createUser } = require('./controllers/users');
const { rateLimiter } = require('./middlewares/rateLimiter');

const { PORT = 3000 } = process.env;
const app = express();

app.enable('trust proxy');
app.use(express.json());
app.use(cors);

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

// ограничение на кол-во запросов от одного IP на единицу времени
app.use(rateLimiter);

// логгер запросов
app.use(requestLogger);

// руты, не требующие авторизации
app.post('/signin', signinValidation, login);
app.post('/signup', signupValidation, createUser);

// авторизация
app.use(auth);

// руты, требующие авторизации
app.use('/users', usersRoutes);
app.use('/movies', moviesRoutes);

// логгер ошибок
app.use(errorLogger);

// обработчики ошибок
app.use(wrongPathHandler);
app.use(errors());
app.use(errHandler);

// подключение к серверу mongo
async function main() {
  await mongoose.connect('mongodb://localhost:27017/moviesdb');

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

main();
