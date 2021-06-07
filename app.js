const dotenv = require('dotenv');
const express = require('express');
const listRouter = require('./server/routes');
const fetch = require('node-fetch');

dotenv.config();

const app = express();

app.set('view engine', 'ejs');
//middleware


app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', listRouter);

app.get('/', ((req, res) => {
  fetch("http://localhost:3000/api/", {
    method: "get",
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .then(data => {
      res.render("list", { listTitle: "Today", newListItems: data.item });
    })
    .catch(err => {
      console.log(err);
      res.render("error_page", { error: err });
    });

}));

app.post('/', ((req, res) => {
  fetch("http://localhost:3000/api/", {
    method: "post",
    body: JSON.stringify(req.body),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .then(data => {
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
