import express from "express";
const app = express()

import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import request from "request";
import { v4 } from 'uuid';

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "css")));
app.use(express.static(path.join(__dirname, "/js")));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/api/postAccessToken', (req, res) => {
    const options = {
        uri:'https://account.demandware.com/dwsso/oauth2/access_token', 
        method: 'POST',
        body: 'grant_type=client_credentials',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic MDZkY2I3NjctMGNhYy00OGM2LWI5MmUtNWRhYzI1ZDA1YTNlOmRwZmVoZmtlaDEx',
        },
      }

    request.post(options, function(err,response,body){ 
        var token

        if (err) {
            console.log(err)
        } else {
            token = JSON.parse(response['body']).access_token

            const data = { "access_token": token }
            
            res.setHeader('Content-Type', 'application/json')
            res.json(JSON.stringify(data, null, 2))
        }
    });
})

app.put('/api/createBoard', (req, res) => {
    let board_div_uuid = v4()

    console.log(board_div_uuid)

    let data_createBoard = {
        c_board_div_uuid: board_div_uuid,
        c_board_title: req.body.title,
        c_board_writer: req.body.writer,
        c_board_msg: req.body.msg
    } 

    console.log(data_createBoard)

    const options = {
        // uri:'https://zyac-001.dx.commercecloud.salesforce.com/s/-/dw/data/v18_1/custom_objects/board/' + board_div_uuid, 
        uri:'https://zyac-001.dx.commercecloud.salesforce.com/s/-/dw/data/v18_1/custom_objects/board/' + req.body.title, 
        method: 'PUT',
        body: JSON.stringify(data_createBoard),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': req.body.access_token,
        },
      }

    request.put(options, function(err,response,body){ 
        if (err) {
            console.log(err)
        } else {
            console.log('success - createBoard')

            res.setHeader('Content-Type', 'application/json')
            res.json(JSON.stringify(data_createBoard, null, 2))
        }
    });
})

app.put('/api/updateBoard', (req, res) => {

    let data_updateBoard = {
        c_board_title: req.body.title,
        c_board_writer: req.body.writer,
        c_board_msg: req.body.msg
    } 

    console.log(data_updateBoard)

    const options = {
        // req.body.title을 uri에 입력하지 않고
        // getBoard.js를 구현해 updateBoard.js 실행시 getBoard.js에서 uuid를 가져오는 함수를 통해 uuid를 가져와 입력해야 합니다. 
        // 게시판 REST API가 작동하는지에 초점을 두어 개발했습니다.
        uri: "https://zyac-001.dx.commercecloud.salesforce.com/s/-/dw/data/v18_1/custom_objects/board/" + req.body.title, 
        method: 'PATCH',
        body: JSON.stringify(data_updateBoard),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': req.body.access_token,
        },
      }

    request.patch(options, function(err,response,body){
        if (err) {
            console.log(err)
        } else {
            console.log('success - updateBoard')

            res.setHeader('Content-Type', 'application/json')
            res.json(JSON.stringify(data_updateBoard, null, 2))
        }
    });
})

app.delete('/api/deleteBoard', (req, res) => {

    console.log("delete - api start")
    console.log(req.body.title)

    const options = {
        // req.body.title을 uri에 입력하지 않고
        // getBoard.js를 구현해 deleteBoard.js 실행시 getBoard.js에서 uuid를 가져오는 함수를 통해 uuid를 가져와 입력해야 합니다. 
        // 게시판 REST API가 작동하는지에 초점을 두어 개발했습니다.
        uri:'https://zyac-001.dx.commercecloud.salesforce.com/s/-/dw/data/v18_1/custom_objects/board/' + req.body.title, 
        method: 'DELETE',
        headers: {
            'Authorization': req.body.access_token
        },
      }

    request.delete(options, function(err,response,body){
        if (err) {
            console.log(err)
        } else {
            console.log('success - deleteBoard')
            res.end()
        }
    });
})

app.use((req, res, next) => {
    res.status(404).send('<h2>[404 Error] Page is not found.</h2>');
});

app.listen(3000, () => {
    console.log('success')
})
