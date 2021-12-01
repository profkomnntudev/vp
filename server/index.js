const express = require("express");
const path = require('path');
const pg = require('pg');


const conString = "postgres://fczedzaw:CxR7MBjzFFI1_PcRXKFdb8aaALiRsifO@castor.db.elephantsql.com/fczedzaw";

/* in requests:
const client = new pg.Client(conString);
client.connect();
client.query("insert sql query")
*/

const clientPg = new pg.Client(conString);

const PORT = process.env.PORT || 3001;

const app = express();

const jsonParse = express.json();

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

//ПОлучить массив имён таблиц(НЕБЕЗОПАСНО)
app.get("/api/tables", (req, res) => {
  // clientPg.connect(err => {
  //   if (err) {
  //     console.error('Не удалось установить соединение с базой данных');
  //     res.status(500).send('Error');
  //   }
  //   else {
  //     clientPg.query('SELECT\n' +
  //         '    table_schema || \'.\' || table_name as table_name\n' +
  //         'FROM\n' +
  //         '    information_schema.tables\n' +
  //         'WHERE\n' +
  //         '    table_type = \'BASE TABLE\'\n' +
  //         'AND\n' +
  //         '    table_schema NOT IN (\'pg_catalog\', \'information_schema\');')
  //         .then(result => {
  //           console.log(result['rows']);
  //           return res.send(result['rows']);
  //         })
  //         .catch(e => {
  //           console.error(e);
  //         })
  //         .finally(()=>{
  //           clientPg.end();
  //         })
  //
  //   }
  // });
  clientPg.query('SELECT\n' +
      '    table_schema || \'.\' || table_name as table_name\n' +
      'FROM\n' +
      '    information_schema.tables\n' +
      'WHERE\n' +
      '    table_type = \'BASE TABLE\'\n' +
      'AND\n' +
      '    table_schema NOT IN (\'pg_catalog\', \'information_schema\');')
      .then(result => {
        console.log(result['rows']);
        return res.send(result['rows']);
      })
      .catch(e => {
        console.error(e);
      })
})

//Получить массив номинаций
app.get("/api/nominations", (req, res) => {
  // clientPg.connect(err => {
  //   if (err) {
  //     console.error('Не удалось установить соединение с базой данных');
  //     res.status(500).send('Error');
  //   }
  //   else {
  //     clientPg.query('select title from "Nominations"')
  //         .then(result => {
  //           return res.send(result['rows']);
  //         })
  //         .catch(err => {
  //           console.error(err);
  //         })
  //         // .finally(()=>{
  //         //   console.log('соединение закрыто');
  //         //   clientPg.end();
  //         // })
  //
  //
  //   }
  // });
  clientPg.query('select title from "Nominations"')
      .then(result => {
        return res.send(result['rows']);
      })
      .catch(err => {
        console.error(err);
      })
})

//Добавить номинацию(сейчас не добавляет)
app.post("/api/nominations/add", jsonParse, (req, res)=>{
    console.log(req.body);

    return res.send('Ничего не произошло, но ты всё равно молодец');
})

//Тест логина в гугле
app.get("/api/tests/google/sing", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'tests', 'google', 'sing.html'));
})

//Редирект для авторизированных пользователей с гугла
app.get("/user/login", (req, res) => {
    res.send("Вы авторизованы");
})

//Основной сайт
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  clientPg.connect((error)=> {
    if (error) {console.error('Ошибка установки связи с бд'); return}
    console.log('Связь с бд установлена');
  });
});
