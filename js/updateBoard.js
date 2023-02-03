function update_board() {
    const create_xhr = new XMLHttpRequest();

    let access_token = document.getElementById('access_token').value;
    let title = document.getElementById('title1').value;
    let writer = document.getElementById('writer1').value;
    let msg = document.getElementById('msg1').value;

    let data = {
        "access_token": "Bearer " + access_token,
        "title": title,
        "writer": writer,
        "msg": msg
    }

    console.log(data)

    create_xhr.open('PUT', '/api/updateBoard');
    create_xhr.setRequestHeader('Content-Type', 'application/json');
    create_xhr.send(JSON.stringify(data));

    create_xhr.onload = function () {
        if (create_xhr.status == 0 || (create_xhr.status >= 200 && create_xhr.status < 400)) {
            const responseText = JSON.parse(create_xhr.responseText)
            console.log(responseText)
        } else {
            console.log("fail to onload - updateBoard")
        }
    }

    create_xhr.onerror = function () {
        console.log("error")
        console.error(create_xhr.responseText);
    }
}