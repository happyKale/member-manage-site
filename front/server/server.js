const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 4000;
const db = require("./config/db");
const app = express();

app.use(cors());
// body로 온 json의 데이터를 오브젝트 형태로 읽을 수 있게 한다.
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("server response success");
});

app.get("/members", (req, res) => {
  db.query("SELECT * FROM member", (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      res.send(err);
    }
  });
});

app.get(`/member/detail/:id`, (req, res) => {
  db.query(`SELECT * FROM member WHERE ID = ${req.params.id}`, (err, data) => {
    if (!err) {
      res.send(data[0]);
    } else {
      res.send(err);
    }
  });
});

app.post("/members", (req, res) => {
  const sql = "INSERT INTO member SET ?";
  db.query(sql, req.body, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      res.send(err);
    }
  });
});

app.patch("/member/:id", (req, res) => {
  const sql = "UPDATE member SET ? WHERE id = " + req.params.id;
  db.query(sql, req.body, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      res.send(err);
    }
  });
});

app.post(`/members/delete`, (req, res) => {
  const sql = `DELETE FROM member WHERE id in ( ${Object.values(req.body)} )`;
  db.query(sql, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      res.send(err);
    }
  });
});

app.listen(PORT, () => {
  console.log(`server run: http://localhost:${PORT}/`);
});
