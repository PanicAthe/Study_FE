const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');

let db
const url = 'mongodb+srv://ekdekdgkrp20:gee5584@cluster0.mu68pim.mongodb.net/?retryWrites=true&w=majority'

new MongoClient(url).connect().then((client) => {
    console.log('몽고 DB 연결 성공');
    db = client.db('incheon');
    app.listen(8080, () => {
        console.log('http://localhost:8080 에서 서버 실행중');
    });    
}).
catch((err) => {
    console.log('몽고 DB 접속 실패');
    });


// public 폴더 연결 코드
app.use(express.static(__dirname + '/public'));

app.get('/', (요청, 응답) => {
    응답.sendFile(__dirname + '/index.html');
});

app.get('/list', async(요청, 응답)=>{
    let result = await db.collection('post').find().toArray()
    응답.send(result);
})