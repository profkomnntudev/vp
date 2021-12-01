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

app.use(function (request, response, next) {
    console.log(formDate(request));
    //response.set('Content-Type', 'text/plain');

    //fs.appendFile("server.log", data + "\n", function(){});
    next();
});

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

//Добавить номинацию
app.post("/api/nominations/add", jsonParse, (req, res)=>{
    //console.log(req.body);

    if (!req.body['nominationName'] || typeof(req.body['nominationName']) !== 'string'){
        console.log('Номинация не является строкой');
        return res.status(400).send({message: 'rejected'});
    }

    const title = req.body['nominationName'];

    clientPg.query('insert into "Nominations" ("title") values ($1)',
        [title])
        .then(result => {
            console.log(`Затронуто строк: ${result.rowCount}`);
            console.log(`Номинация '${title}' успешно добавлена`);
            res.send({status: true});
        })
        .catch(err => {
            console.log('Ошибка');
            if (err.code === '23505'){
                console.error(`Номинация '${title}' уже существует`);
                return res.status(401).send({status: 'already exist'});
            }
            console.error(err);
            return res.status(500).send({status: 'unknown error'});
        })

    //return res.send('Ничего не произошло, но ты всё равно молодец');
})

//промежуточные итоги
app.get("/api/nominations/result", (req, res) => {

    clientPg.query("select nomination, name, surname, patronymic, \"countVotes\" from \"Candidates\"\n" +
        "order by nomination, \"countVotes\" desc")
        .then(result => {
            console.log(`Отпрввлено ${result['rows'].length} записей`);
            res.send(result['rows']);
        })
        .catch(err => {
            console.log('Ошибка');
            console.error(err);
            res.status(500).send({status: 'unknown error'});
        })
})

//Получить победителей в номинации
app.get("/api/nominations/winners", (req, res) => {
    clientPg.query(
        "select nomination, name, surname, patronymic, \"countVotes\" from \"Candidates\" as c1" +
        "   where " +
        "   \"countVotes\" in " +
        "       (select max(\"countVotes\") from \"Candidates\" as c2 " +
        "           where c1.\"nomination\" = c2.\"nomination\")")
        .then(result => {
            console.log(`Отпрввлено ${result['rows'].length} записей`);
            res.send(result['rows']);

            // let winners = [];
            // for (let i = 0; i < result['rows'].length; ++i){
            //     let winner = {
            //         nomination: result['rows'][i]['nomination'],
            //
            //     }
            // }
        })
        .catch(err => {
            console.log('Ошибка');
            console.error(err);
            res.status(500).send({status: 'unknown error'});
        })
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

//Формирует строку запроса для логгирования
function formDate(request) {
    let now = new Date();
    //let day = now.getDay();
    //let month = now.getMonth();
    //let year = now.getUTCFullYear();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    return `${hour}:${minutes}:${seconds} ${request.method} [[${request.url}]] ${request.get("user-agent")}`;
    //let login = request.session.login ? request.session.login : 'Неавторизован';
    //if (!request.session.login) request.session.login = 'Неавторизован';
    // if (force) {
    //     return `${day}.${month}.${year} ${hour}:${minutes}:${seconds} ${request.method} [[${request.url}]]` +
    //         ` ${request.session.login} (${request.sessionID}) ${request.get("user-agent")}`;
    // }
    // return `${hour}:${minutes}:${seconds} ${request.method} [[${request.url}]]` +
    //     ` ${request.session.login} (${request.sessionID}) ${request.get("user-agent")}`;
}
