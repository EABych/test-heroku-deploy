const bodyParser = require('body-parser');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const url = require('url');
const admin = require("firebase-admin");
const jwt = require('jsonwebtoken');

const accessTokenSecret = 'youraccesstokensecret';
const serviceAccount = require("./public/serviceAccountKey.json");
const authenticateJWT = require("./_helpers/authenticateJWT");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ang-simple-organizer.firebaseio.com"
});

const db = admin.database();

const app = express();
app.use(express.static('./client/dist/simple-organize-app'));


app.get('/*', function (req, res) {
  res.sendFile('index.html', { root: './client/dist/simple-organize-app' }
  );
});


app.use(bodyParser.urlencoded({extended: false}))
app.use(cors({origin: true}));
app.use(bodyParser.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin, Cache-Control");
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));





// user
app.post('/login', cors(), function (req, res) {
  const {login, password} = req.body;

  db.ref(`users/${login}`).once('value')
      .then(resp => {
        if (resp.val()) {
          const data = Object.values(resp.val())[0];
          const id = Object.keys(resp.val())[0];
          if (data.password === password) {
            const accessToken = jwt.sign({username: login,}, accessTokenSecret);

            res.status(200).json({
              id,
              login,
              email: data.email,
              tasksList: data.tasksList,
              accessToken,
            });
          } else {
            res.status(500).send('Password doesn`t correct!');
          }
        } else {
          res.status(500).send('User doesn`t exist!');
        }
      })
      .catch(() => {
            res.status(500).send('Something broke!');
          }
      )
});

app.post('/registration', cors(), function (req, res) {
  const {login, password, email,} = req.body;
  const tasksList = {test:'test'}
  db.ref(`users/${login}`).once('value')
      .then(resp => {
        if (resp.val()) {
          res.status(500).send('User already exist!');
        } else {
          db.ref(`users/${login}`)
              .push({password, email, tasksList})
              .once('value')
              .then((() => {
                const accessToken = jwt.sign({username: login,}, accessTokenSecret);

                db.ref(`users/${login}`).once('value').then((resp => {
                  const data = Object.values(resp.val())[0];
                  const id = Object.keys(resp.val())[0];

                  res.status(200).json({
                    id,
                    login,
                    email: data.email,
                    tasksList: data.tasksList,
                    accessToken,
                  });
                }))
              }))
              .catch(() => {
                    res.status(500).send('Something broke!');
                  }
              )
        }
      })
});

app.get('/user', authenticateJWT, (req, res) => {
  db.ref(`users/${req.user.username}`).once('value')
      .then(resp => {
        if (resp.val()) {
          const data = Object.values(resp.val())[0];
          const id = Object.keys(resp.val())[0];
          res.status(200).json({
            id,
            login: req.user.username,
            email: data.email,
            tasksList: data.tasksList,
          });
        }
      })
      .catch(() => {
            res.status(500).send('Something broke!');
          }
      )
});


// notes
app.post('/addTodo', authenticateJWT, (req, res) => {
  const {text, date, userId, userName,} = req.body;

  db.ref(`users/${userName}/${userId}/tasksList/${date}`)
      .push(text)
      .then((snap) => {
        const key = snap.key
        res.status(200).json({
          key,
        });
      })
      .catch(() => {
        res.status(500).send('Something broke!');
      })
});

app.delete('/deleteTodo', authenticateJWT, (req, res) => {
  const {date, id,  userId, userName} = url.parse(req.url, true).query;

  db.ref(`users/${userName}/${userId}/tasksList/${date}/${id}`)
      .remove()
      .then(() => {
        res.status(200).json({});    })
      .catch(() => {
        res.status(500).send('Something broke!');
      })
});

app.put('/editTodo', authenticateJWT, (req, res) => {
  const {newValue, date, id,  userId, userName} = req.body;

  db.ref(`users/${userName}/${userId}/tasksList/${date}/${id}`)
      .set(newValue)
      .then(() => {
        res.status(200).json({});})
      .catch(() => {
        res.status(500).send('Something broke!');
      })
});





app.use(function (req, res, next) {
  next(createError(404));
});



app.use(function (err, req, res) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
