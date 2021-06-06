import axios from 'axios';
import { config } from 'dotenv';
import express from 'express';
import listRouter from './routes/listRouter.js';
//Database connect
import db from "./models/index.js";
import expressAsyncHandler from 'express-async-handler';
import fetch from 'node-fetch';

config();

const app = express();

app.set('view engine', 'ejs');
//middleware


app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));





app.use('/api', listRouter);

app.get('/', expressAsyncHandler(async (req, res) => {
  fetch("http://localhost:3000/api/", {
    method: "get",
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .then(data => {
      res.render("list", { listTitle: "Today", newListItems: data });
    })
    .catch(err => {
      console.log(err);
      res.render("error_page", { error: err });
    });

}));

app.post('/', expressAsyncHandler(async (req, res) => {
  console.log(JSON.stringify(req.body));
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



const port = parseInt(process.env.PORT, 10) || 3000;
app.set('port', port);
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
