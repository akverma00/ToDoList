const dotenv = require('dotenv');
const express = require('express');
const listRouter = require('./server/routes');
const fetch = require('node-fetch');
const redis = require('redis');
const path = require('path');

dotenv.config();

const app = express();

app.set('view engine', 'ejs');
//redis
const client = redis.createClient(process.env.REDIS_PORT || 6379);
// Cache middleware for specified todo item id
const cached_data = (req, res, next) => {
  client.get('list1', (err, data) => {
    if (err) throw err;
    if (data !== null) {

      console.log("data from redis");
      res.render("list", { listTitle: "Today", newListItems: JSON.parse(data) });
    }
    else next();
  })
}
//middleware


app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//
const { publishToQueue } = require('./services/MQService');
app.use('/api', listRouter);

app.get('/', cached_data, ((req, res) => {
  fetch("http://localhost:3000/api/", {
    method: "get",
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .then(data => {
      console.log("data from database");

      client.setex('list1', 50, JSON.stringify(data));
      res.render("list", { listTitle: "Today", newListItems: data });
    })
    .catch(err => {
      console.log(err);
      res.render("error_page", { error: err });
    });

}));

app.post('/', (async (req, res) => {
  await publishToQueue({
    queueName: 'testing_1',
    payload: {
      body: req.body,
      url: 'http://localhost:3000/api/',
      method: "post",
      headers: { "Content-Type": "application/json" }
    }
  });

  fetch("http://localhost:3000/api/", {
    method: "post",
    body: JSON.stringify(req.body),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .then(data => {

      client.del('list1');
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
      res.render("error_page", { error: err });
    });

}));


app.post('/toggle', ((req, res) => {

  fetch(`http://localhost:3000/api/${req.body.id}/${req.body.completed}`, {
    method: "put",
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .then(data => {
      client.del('list1');
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
      res.render("error_page", { error: err });
    });

}));
app.get('/delete/:id', ((req, res) => {

  fetch(`http://localhost:3000/api/${req.params.id}`, {
    method: "delete",
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .then(data => {

      client.del('list1');
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
      res.render("error_page", { error: err });
    });

}));




const port = parseInt(process.env.PORT, 10) || 3000;
app.set('port', port);
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
