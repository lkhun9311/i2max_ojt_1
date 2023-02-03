document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btn_access_token');
  
    if(btn) {
        btn.addEventListener('click', () => {
            post_access_token()
        });
    }
});

function post_access_token() {
    const access_xhr = new XMLHttpRequest();

    access_xhr.open('POST', '/api/postAccessToken');
    access_xhr.setRequestHeader('Content-Type', 'application/json');
    access_xhr.send();

    access_xhr.onload = function () {
        if (access_xhr.status == 0 || (access_xhr.status >= 200 && access_xhr.status < 400)) {
            const responseText = JSON.parse(access_xhr.responseText)
            document.getElementById('access_token').value = JSON.parse(responseText).access_token;
        } else {
            console.log("fail to onload - postAccessToken")
        }
    }

    access_xhr.onerror = function () {
        console.log("error")
        console.error(access_xhr.responseText);
    }
}