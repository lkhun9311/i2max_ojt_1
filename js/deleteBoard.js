function delete_board() {
    const create_xhr = new XMLHttpRequest();

    let access_token = document.getElementById('access_token').value;
    let title = document.getElementById('title1').value;

    let data = {
        "access_token": "Bearer " + access_token,
        "title": title 
    }

    console.log("delete - xhr start")
    console.log(data)

    create_xhr.open('DELETE', '/api/deleteBoard');
    create_xhr.setRequestHeader('Content-Type', 'application/json');
    create_xhr.send(JSON.stringify(data));

    create_xhr.onload = function () {
        if (create_xhr.status == 0 || (create_xhr.status >= 200 && create_xhr.status < 400)) {
            console.log("success- delete xhr")
        } else {
            console.log("fail to onload - deleteBoard")
        }
    }

    create_xhr.onerror = function () {
        console.log("error")
        console.error(create_xhr.responseText);
    }
}