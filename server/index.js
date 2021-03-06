const express = require("express"),
    path = require('path'),
    pg = require('pg'),
    cors = require("cors"),
    axios = require("axios").default;


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

app.use(cors());

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

    const isTeacher = req.query['nominant'] ? (req.query['nominant'] === 'teacher' ? true : (req.query['nominant'] === 'student' ? false : undefined)) : undefined;

    clientPg.query('select * from "Nominations"' + (isTeacher !== undefined ? (isTeacher ? 'where teacher = true' : 'where teacher = false') : ''))
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

//Список кандидатов
app.get("/api/candidates", (req, res) => {

    const nomination = req.query['nomination'];
    //console.log(nomination)
    clientPg.query("select nomination, name, surname, patronymic, \"countVotes\", id, about, img from \"Candidates\"\n" +
        (nomination ? `where nomination = '${nomination}'` : '') +
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

//Пользователь вошёл в систему
app.post("/api/voted/login", jsonParse, (req, res)=>{

    const googleId = req.body['googleID'];

    //console.log(req.body);

    if (!googleId) {
        console.log('Отсутствуют необходимые параметры');
        return res.status(400).send('Rejected');
    }

    clientPg.query('insert into "Voted" (' +
        'id, ' +
        'nomination1, ' +
        'nomination2, ' +
        'nomination3, ' +
        'nomination4, ' +
        'nomination5, ' +
        'nomination6, ' +
        'nomination7, ' +
        'nomination8, ' +
        'nomination9, ' +
        'nomination10) values ($1, $2, $2, $2, $2, $2, $2, $2, $2, $2, $2)',
        [googleId, null])
        .then(result => {
            console.log(`Затронуто строк: ${result.rowCount}`);
            console.log(`Избиратель '${googleId}' успешно добавлен`);
            return res.status(201).send({status: 'created'});
        })
        .catch(err => {
            if (err.code === '23505'){
                console.log(`Избиратель '${googleId}' вошёл в систему`);
                return res.status(200).send({status: 'exist'});
            }
            console.log('Ошибка');
            console.error(err);
            return res.status(500).send({status: 'unknown error'});
        })
})

app.put("/api/voted/checkNomination", jsonParse, (req, res) => {
    const token = req.body['idToken'],
        nomination = searchNomination(req.body['nomination']);
    console.log(token)
    console.log(nomination)

    if (nomination === undefined || !token){
        console.error('Неверная номинация или токен');
        return res.status(400).send({status: 'rejected'});
    }

    const googleCheck = "https://www.googleapis.com/oauth2/v3/tokeninfo";
    let voterId;

    axios.get(googleCheck, {
        params: {
            id_token: token
        }
    })
        .then(result => {
            if (!result || !result.data || !result.data['sub']){
                throw new Error('Непонятно почему, но googleId не пришёл');
            }
            voterId = result.data['sub'];
            return clientPg.query(`select ${nomination} as nom from "Voted" where id = $1`, [voterId])
        })
        .then(src => {
            //console.log(src['rows']);
            const id = src['rows'].length === 0 ? null : src['rows'][0]['nom'];
            //console.log(id);
            res.send({id: id});
        })
        // .catch(err => {
        //     if (err && err.response && err.response.status && err.response.status === 400){
        //         console.error('Неверный токен');
        //         return res.status(404).send({status: 'invalid token'});
        //     }
        //     console.log('Ошибка');
        //     console.error(err);
        //     res.status(500).send({status: 'unknown error'});
        // })
        .catch(err => catchGoogle(err, res))
})

//Обработка ошибок при гугл запросе
function catchGoogle(err, res){
    if (err && err.response && err.response.status && err.response.status === 400){
        console.error('Неверный токен');
        return res.status(404).send({status: 'invalid token'});
    }
    // if (err === 'token not equal sub'){
    //     console.error('Токен пользователя не принадлежит ему');
    //     return res.status(405).send({status: 'invalid token or id'});
    // }
    console.log('Ошибка');
    console.error(err);
    res.status(500).send({status: 'unknown error'});
}

//Учёт голоса
app.post("/api/voted/getVote", jsonParse, (req, res) => {

    const token = req.body['idToken'],
        nomId = req.body['nomineeID'],
        nomination = req.body['nomination'];
        //voterId = req.body['voterId'];

    if (!token || !nomId || !nomination)
    {
        console.log('Отсутствуют необходимые параметры');
        return res.status(400).send('Rejected');
    }

    const googleCheck = "https://www.googleapis.com/oauth2/v3/tokeninfo";
    let voterId;

    axios.get(googleCheck, {
        params: {
            id_token: token
        }
    })
        .then(result => {
            if (!result || !result.data || !result.data['sub']){
                throw new Error('Непонятно почему, но googleId не пришёл');
            }
            voterId = result.data['sub'];
            return clientPg.query('select 1 as "isExist" from "Voted" where id = $1', [voterId]);
        })
        .then(src => {
            //console.log(src);
            if (src['rows'].length === 0){
                throw new Error('Не залогинен');
            }
            const nom = searchNomination(nomination);
            //console.log(nom);
            return clientPg.query(`update "Voted" set ${nom} = $1 where id = $2`,
                [nomId, voterId]);
        })
        // .then(updt => {
        //
        // })
        .then(updateResult => {
            console.log(`Затронуто строк: ${updateResult['rowCount']}`)
            console.log(`Голос успешно учтён`);
            res.status(201).send({status: true});
        })
        .catch(err => {
            catchGoogle(err, res);
        })

    //res.send('ok');
})

//Перечисление номинаций
//Определяется для БД
const Nominations = Object.freeze({
    'nomination1': 'Активист года',
    'nomination2': 'Лучший лектор',
    'nomination3': 'Политехник года',
    'nomination4': 'Преподаватель года',
    'nomination5': 'Самый изобретательный',
    'nomination6': 'Самый инновационный',
    'nomination7': 'Самый позитивный',
    'nomination8': 'Самый стильный',
    'nomination9': 'Самый умный',
    'nomination10': 'Спортсмен года',
    'nomination11': 'Лучшее мероприятие',
})

// //Пересичление категорий
// const Categories = Object.freeze({
//     'teacher': 'true',
//     'student': 'false',
//
// })

//Поиск номинации
function searchNomination(nomination){
    for (let key in Nominations){
        if (Nominations.hasOwnProperty(key) && Nominations[key] === nomination){
            return key;
        }
    }
    return undefined;
}

//Промежуточные итоги
app.get("/api/nominations/result", (req, res) => {
    //Старый запрос
    // clientPg.query("select nomination, name, surname, patronymic, \"countVotes\" from \"Candidates\"\n" +
    //     "order by nomination, \"countVotes\" desc")
    clientPg.query('select nomination, name, surname, patronymic, (select count(*) from "Voted" as vot where ' +
        '   vot.nomination1 = can.id' +
        '   or vot.nomination1 = can.id' +
        '   or vot.nomination2 = can.id' +
        '   or vot.nomination3 = can.id' +
        '   or vot.nomination4 = can.id' +
        '   or vot.nomination5 = can.id' +
        '   or vot.nomination6 = can.id' +
        '   or vot.nomination7 = can.id' +
        '   or vot.nomination8 = can.id' +
        '   or vot.nomination9 = can.id' +
        '   or vot.nomination10 = can.id' +
        '   or vot.nomination11 = can.id' +
        '  ) as "countVotes" from "Candidates" as can ' +
        'order by nomination, "countVotes" desc')
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

//Добавить кандидата
app.post("/api/candidates/add", jsonParse, (req, res) =>{

    //Проверка на существование полей
    if (!req.body
        || !req.body['nomination']
        || !req.body['name']
        || !req.body['surname']
        //|| !req.body['patronymic']
    )
    {
        console.log('Недостаточно данных для доабвления кандидата');
        return res.status(400).send({message: 'rejected'});
    }

    const cand = {
        name: req.body['name'],
        surname: req.body['surname'],
        patronymic: req.body['patronymic'] ?? null,
        nomination: req.body['nomination']
    }

    // const sql = 'select if (select * from "Candidates" where name = $1 and surname = $2 and patronymic = $3 and nomination = $4,' +
    //     'insert into "Candidates" (name, surname, patronymic, nomination) values ($1, $2, $3, $4),' +
    //     '0)';



    clientPg.query('select * from "Candidates" where name = $1 and surname = $2 and patronymic = $3 and nomination = $4',
        [cand.name, cand.surname, cand.patronymic, cand.nomination])
        .then(result => {
            //console.log(result);
            if (result.rowCount === 0 ){
                return clientPg.query('insert into "Candidates" (name, surname, patronymic, nomination) values ($1, $2, $3, $4)',
                    [cand.name, cand.surname, cand.patronymic, cand.nomination])
            }
            else throw 'candidate was exist';
        })
        .then(result => {
            console.log(`Затронуто строк: ${result.rowCount}`);
            console.log(`Пользователь ${cand.name} ${cand.surname} успешно добавлен`);
            res.send({status: true});
        })
        .catch(err => {
            console.log('Ошибка');
            if (err.code === '23505' || err === 'candidate was exist'){
                console.error(`Пользователь ${cand.name} ${cand.surname} уже существует`);
                return res.status(401).send({status: 'already exist'});
            }
            console.error(err);
            return res.status(500).send({status: 'unknown error'});
        })
})

// //Тест логина в гугле
// app.get("/api/tests/google/sing", (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'tests', 'google', 'sing.html'));
// })

// //Редирект для авторизированных пользователей с гугла
// app.get("/user/login", (req, res) => {
//     res.send("Вы авторизованы");
// })

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
