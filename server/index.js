const express = require("express"),
    path = require('path'),
    pg = require('pg'),
    cors = require("cors"),
    crypto = require('crypto')

//const conString = "postgres://fczedzaw:CxR7MBjzFFI1_PcRXKFdb8aaALiRsifO@castor.db.elephantsql.com/fczedzaw";

const clientPg = new pg.Pool({
    user: 'vp_admin',
    host: '95.163.233.230',
    database: 'vp_database',
    password: 'vp_admin',
    port: 5432,
  });

const app_id = "51502517"
const secretKey = "mIOcXE7SwgnSAyVRFkJt"

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || 'http://localhost';

const app = express();

const jsonParse = express.json();

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(function (request, response, next) {
    console.log(formDate(request));
    next();
});

app.use(cors());

// //ПОлучить массив имён таблиц(НЕБЕЗОПАСНО)
// app.get("/api/tables", (req, res) => {
//   // clientPg.connect(err => {
//   //   if (err) {
//   //     console.error('Не удалось установить соединение с базой данных');
//   //     res.status(500).send('Error');
//   //   }
//   //   else {
//   //     clientPg.query('SELECT\n' +
//   //         '    table_schema || \'.\' || table_name as table_name\n' +
//   //         'FROM\n' +
//   //         '    information_schema.tables\n' +
//   //         'WHERE\n' +
//   //         '    table_type = \'BASE TABLE\'\n' +
//   //         'AND\n' +
//   //         '    table_schema NOT IN (\'pg_catalog\', \'information_schema\');')
//   //         .then(result => {
//   //           console.log(result['rows']);
//   //           return res.send(result['rows']);
//   //         })
//   //         .catch(e => {
//   //           console.error(e);
//   //         })
//   //         .finally(()=>{
//   //           clientPg.end();
//   //         })
//   //
//   //   }
//   // });
//   clientPg.query('SELECT\n' +
//       '    table_schema || \'.\' || table_name as table_name\n' +
//       'FROM\n' +
//       '    information_schema.tables\n' +
//       'WHERE\n' +
//       '    table_type = \'BASE TABLE\'\n' +
//       'AND\n' +
//       '    table_schema NOT IN (\'pg_catalog\', \'information_schema\');')
//       .then(result => {
//         console.log(result['rows']);
//         return res.send(result['rows']);
//       })
//       .catch(e => {
//         console.error(e);
//       })
// })

//Получить список номинаций
app.get("/api/nominations", async (req, res) => {

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
app.post("/api/nominations/add", jsonParse, async (req, res)=>{

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
app.get("/api/candidates", async (req, res) => {
    const nomination = req.query['nomination'];
    if (!nomination){
        console.error('Неверная номинация');
        return res.status(400).send({status: 'rejected'});
    }
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
app.post("/api/voted/login", jsonParse, async (req, res)=>{

    const vkId = req.body['vkId'],
        hash = req.body['hash']

    console.log(req.body);

    if (!vkId || !hash) {
        console.log('Отсутствуют необходимые параметры');
        return res.status(400).send('Rejected');
    }

    const hh = crypto.createHash("md5").update(`${app_id}${vkId}${secretKey}`).digest("hex")

    if (hash !== hh){

        res.status(404).send("UnAuthorization")
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
        [vkId, null])
        .then(result => {
            console.log(`Затронуто строк: ${result.rowCount}`);
            console.log(`Избиратель '${vkId}' успешно добавлен`);
            return res.status(201).send({status: 'created'});
        })
        .catch(err => {
            if (err.code === '23505'){
                console.log(`Избиратель '${vkId}' вошёл в систему`);
                return res.status(200).send({status: 'exist'});
            }
            console.log('Ошибка');
            console.error(err);
            return res.status(500).send({status: 'unknown error'});
        })
})

app.put("/api/voted/checkNomination", jsonParse, async (req, res) => {
    const userId = req.body['vkId'],
        hash = req.body['hash'],
        nomination = searchNomination(req.body['nomination']);

    if (nomination === undefined || nomination === "" || !userId || !hash){
        console.error('Неверная номинация или токен');
        return res.status(400).send({status: 'rejected'});
    }

    const hh = crypto.createHash("md5").update(`${app_id}${userId}${secretKey}`).digest("hex")

    if (hash !== hh){
        res.status(404).send("UnAuthorization")
    }

    clientPg.query(`select ${nomination} as nom from "Voted" where id = $1`, [userId])
        .then(src => {
            const id = src['rows'].length === 0 ? null : src['rows'][0]['nom'];
            res.send({id: id});
        })
        .catch(err=>{
            console.error(err)
            res.status(500).send("unknown error")
        })
})

// //Обработка ошибок при гугл запросе
// function catchGoogle(err, res){
//     if (err && err.response && err.response.status && err.response.status === 400){
//         console.error('Неверный токен');
//         return res.status(404).send({status: 'invalid token'});
//     }
//     // if (err === 'token not equal sub'){
//     //     console.error('Токен пользователя не принадлежит ему');
//     //     return res.status(405).send({status: 'invalid token or id'});
//     // }
//     console.log('Ошибка');
//     console.error(err);
//     res.status(500).send({status: 'unknown error'});
// }

//Учёт голоса
app.post("/api/voted/getVote", jsonParse, async (req, res) => {

    const userId = req.body['vkId'],
        nomId = req.body['nomineeID'],
        hash = req.body['hash'],
        nomination = req.body['nomination'];

    if (!userId || !nomId || !nomination || !hash)
    {
        console.log('Отсутствуют необходимые параметры');
        return res.status(400).send('Rejected');
    }

    const hh = crypto.createHash("md5").update(`${app_id}${userId}${secretKey}`).digest("hex")

    if (hash !== hh){
        // console.log(`hash: ${hash}`)
        // console.log(`hh: ${hh}`)
        res.status(404).send("UnAuthorization")
    }

    clientPg.query('select 1 as "isExist" from "Voted" where id = $1', [userId])
        .then(src => {
            if (src['rows'].length === 0){
                throw new Error('Не залогинен');
            }
            const nom = searchNomination(nomination);
            return clientPg.query(`update "Voted" set ${nom} = $1 where id = $2`,
                [nomId, userId]);
        })
        .then(updateResult => {
            console.log(`Затронуто строк: ${updateResult['rowCount']}`)
            console.log(`Голос успешно учтён`);
            res.status(201).send({status: true});
        })
        .catch(err => {
            console.error(err)
            res.status(500).send("unknown error")
        })
})

//Перечисление номинаций
//Определяется для БД
const Nominations = Object.freeze({
    'nomination1': 'Активист года',
    'nomination2': 'Лучший лектор',
    'nomination3': 'Политехник года',
    'nomination4': 'Преподаватель года',
    'nomination5': 'Самый изобретательный',
    'nomination6': 'Самый творческий',
    'nomination7': 'Самый медийный',
    'nomination8': 'Самый стильный',
    'nomination9': 'Душа компании',
    'nomination10': 'Спортсмен года',
    'nomination11': 'Лучшее мероприятие',
})


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
app.get("/api/nominations/result", async (req, res) => {
    //Старый запрос
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
app.get("/api/nominations/winners", async (req, res) => {
    clientPg.query(
        "select nomination, name, surname, patronymic, \"countVotes\" from \"Candidates\" as c1" +
        "   where " +
        "   \"countVotes\" in " +
        "       (select max(\"countVotes\") from \"Candidates\" as c2 " +
        "           where c1.\"nomination\" = c2.\"nomination\")")
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

//ПОлучить картинку номиннта
app.get("/nominants/:img", async (req,res)=>{
    const image = req.params["img"]
    if (!image){
        return res.status(404).send("Not found")
    }

    res.sendFile(path.resolve(__dirname, "..") + `/client/public/nominants/${image}`)
})

//Добавить кандидата
app.post("/api/candidates/add", jsonParse, async (req, res) =>{

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
        patronymic: req.body['patronymic'] || null,
        nomination: req.body['nomination']
    }

    clientPg.query('select * from "Candidates" where name = $1 and surname = $2 and patronymic = $3 and nomination = $4',
        [cand.name, cand.surname, cand.patronymic, cand.nomination])
        .then(result => {
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

app.get('/.well-known/acme-challenge/_1C78JO_hv4b52eJ7pdBhnio0wzDWeB7XC41ZHs_kiE', function(req, res) {
    res.status(200);
    res.send('_1C78JO_hv4b52eJ7pdBhnio0wzDWeB7XC41ZHs_kiE.lkfAKRCKw9Ats1YecbShSzelFE18Aejvm1n3rRDIjMw');
  });

//Основной сайт
app.get('*', async (req, res) => {
    console.log('front')
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
});

app.listen(PORT, () => {
    console.log(`Application started on URL ${HOST}:${PORT} ?`);
    clientPg.connect((error) => {
        if (error) {
            console.error('Ошибка установки связи с бд');
            return
        }
        console.log('Связь с бд установлена');
    });
})

//Формирует строку запроса для логгирования
function formDate(request) {
    let now = new Date();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    return `${hour}:${minutes}:${seconds} ${request.method} [[${request.url}]] ${request.get("user-agent")}`;
}
