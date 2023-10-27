const express = require('express');
const app = express();
const { MongoClient, ObjectId } = require('mongodb');

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//몽고db 연결 코드
let db;
const url = 'mongodb+srv://ekdekdgkrp20:gee5584@cluster0.mu68pim.mongodb.net/?retryWrites=true&w=majority';
new MongoClient(url)
    .connect()
    .then((client) => {
        console.log('몽고DB 연결됐음. 굿');
        db = client.db('Incheon');
    })
    .catch((err) => {
        console.log('DB 접속 못했어');
    });

//서버연결 포트
app.listen(8080, () => {
    console.log('http://localhost:8080 에서 서버 실행중');
});

app.get('/', (요청, 응답) => {
    응답.sendFile(__dirname + '/index.html');
});

//LIST에 콜렉션에 있는 데이터 출력
app.get('/list', async (요청, 응답) => {
    let result = await db.collection('post').find().toArray();
    응답.render('board.ejs', { 목록: result });
});

app.get('/time', (요청, 응답) => {
    응답.render('time.ejs', { data: new Date() });
});

app.get('/write', (요청, 응답) => {
    응답.render('write.ejs');
});

app.post('/add', async (요청, 응답) => {
    try {
        if (요청.body.title == '') {
            응답.send('야, 니 압력안했는데, 뭐하니?');
        } else {
            await db.collection('post').insertOne({ title: 요청.body.title, content: 요청.body.content });
            응답.redirect('/list');
        }
    } catch (e) {
        console.log(e);
        응답.send('몽고DB에러남');
    }
});


// 우리중 한 사람이
// 디테일에 접속하면
// id가 거시기인 DB를 찾아서
// ejs에 글을 박고 유저에게 보내라.

app.get('/detail/:kkk', (요청, 응답)=>{
    console.log(요청.params);
    응답.render('detail.ejs');
});