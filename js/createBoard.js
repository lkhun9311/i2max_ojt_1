document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btn_create_board');
  
    if(btn) {
        btn.addEventListener('click', () => {
            create_board()
        });
    }
});

function create_board() {
    const create_xhr = new XMLHttpRequest();

    let access_token = document.getElementById('access_token').value;
    let title = document.getElementById('title').value;
    let writer = document.getElementById('writer').value;
    let msg = document.getElementById('msg').value;

    let data = {
        "access_token": "Bearer " + access_token,
        "title": title,
        "writer": writer,
        "msg": msg
    }

    create_xhr.open('PUT', '/api/createBoard');
    create_xhr.setRequestHeader('Content-Type', 'application/json');
    create_xhr.send(JSON.stringify(data));

    create_xhr.onload = function () {
        if (create_xhr.status == 0 || (create_xhr.status >= 200 && create_xhr.status < 400)) {
            const responseText = JSON.parse(create_xhr.responseText)
            const createBoaard_prepend = document.getElementById('addBoard');

            console.log(responseText)

            var title_reset = document.getElementById('title');
            var writer_reset = document.getElementById('writer');
            var msg_reset = document.getElementById('msg');

            title_reset.value = null
            writer_reset.value = null
            msg_reset.value = null;

            var parser = new DOMParser();

            let prepend_new_element = `<div class="container">
                                           <div>
                                               <input type="text" id="title1" name="title" placeholder="게시글 제목" value=${JSON.parse(responseText).c_board_title} required/> 
                                               <input type="text" id="writer1" name="writer" placeholder="게시글 글쓴이" value=${JSON.parse(responseText).c_board_writer} required/>
                                           </div>
                                           <div>
                                               <textarea id="msg1" name="msg" placeholder="게시글 내용" required>${JSON.parse(responseText).c_board_msg}</textarea>
                                           </div>
                                           <button type="button" id="btn_update_board">수정 버튼</button>
                                           <button type="button" id="btn_delete_board">삭제 버튼</button>
                                       </div>`;

            createBoaard_prepend.prepend(parser.parseFromString(prepend_new_element, 'text/html').documentElement)

            // innerHTML을 활용해 구현한 방법
            // createBoaard_prepend.innerHTML += `<div class="container" id=${JSON.parse(responseText).c_board_div_uuid}>
            //                                       <div>
            //                                           <input type="text" id="title1" name="title" placeholder="게시글 제목" value=${JSON.parse(responseText).c_board_title} required/> 
            //                                           <input type="text" id="writer1" name="writer" placeholder="게시글 글쓴이" value=${JSON.parse(responseText).c_board_writer} required/>
            //                                       </div>
            //                                       <div>
            //                                           <textarea id="msg1" name="msg" placeholder="게시글 내용" required>${JSON.parse(responseText).c_board_msg}</textarea>
            //                                       </div>
            //                                       <button type="button" id="btn_update_board">수정 버튼</button>
            //                                       <button type="button" id="btn_delete_board">삭제 버튼</button>
            //                                   </div>`;

            const btn_update = document.getElementById('btn_update_board');
            const btn_delete = document.getElementById('btn_delete_board');
            console.log("update/delete - loaded")
    
            if(btn_update) {
                btn_update.addEventListener('click', () => {
                    console.log("update - clicked!")
                    update_board()
                });
            }

            if(btn_delete) {
                btn_delete.addEventListener('click', () => {
                    console.log("delete - clicked!")
                    delete_board()
                });
            }
            
        } else {
            console.log("fail to onload - createBoard")
        }
    }

    create_xhr.onerror = function () {
        console.log("error")
        console.error(create_xhr.responseText);
    }
}
