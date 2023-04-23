   let allMemo = JSON.parse(localStorage.getItem("allMemo")); // Memo 저장하는 빈 배열객체
            allMemo = allMemo ?? [];

            // 초기화버튼 클릭시 메모등록 안되는 것 해결 ul, title, content 값을 바깥에서 선언 후 reset함수에 ul, allMemo 초기화 함.
            const ul = document.querySelector('ul');
            const title = document.querySelector('#memo-title').value;
            const content = document.querySelector('#memo-content').value;

            const input = document.querySelector('input');
            const textarea = document.querySelector('textarea');

            const addBtn = document.querySelector('#add-btn');
            addBtn.addEventListener('click', saveNote);  // addBtn 클릭시 Memo 저장

            const resetBtn = document.querySelector('#reset-btn');
            resetBtn.addEventListener('click', resetMemo)  // resetBtn 클릭시 Memo 전체 초기화

            render();

            input.value = '';
            textarea = '';

            function resetMemo() {  // 초기화 함수
                const resetBtn = document.querySelector('#reset-btn');
                window.localStorage.clear();
                ul.innerHTML = '';
                allMemo = [];
                render();
            }

            function saveNote(event) {
                const title = document.querySelector('#memo-title').value;
                const content = document.querySelector('#memo-content').value;
                allMemo.push({ title, content, len: allMemo.length }); // allMemo에 저장

                localStorage.setItem("allMemo", JSON.stringify(allMemo));
                render();
            }

            function render() {  // 랜더 함수 
                const title = document.querySelector('#memo-title').value;
                const content = document.querySelector('#memo-content').value;
                const display = document.querySelector("#display");  // 보여주는 컨텐츠박스
                display.innerHTML = "";  //innerHTML 초기화

                for (const item of allMemo) {   // allMemo의 of니까 value값 돌겠다.
                    const li = document.createElement('li'); // li 태그 생성
                    const saveTitle = document.createElement("h2"); // h2생성후 = saveTitle (제목값 저장)
                    const saveContent = document.createElement("p"); // p생성후 = saveContent (컨텐츠 저장)
                    const saveId = document.createElement("p"); // p 생성 후 = saveId (Id값 저장)
                    const btnGroup = document.createElement("div");  // div 생성
                    
                    const colorBtn = document.createElement("button"); // 수정 버튼생성
                    const deleteMemoBtn = document.createElement("button"); // button 생성 후 = deleteMemoBtn (삭제버튼 생성)

                    // 순회 돌면서 인덱스의 벨류값 저장
                    saveTitle.textContent = item.title;
                    saveContent.textContent = item.content;
                    saveId.textContent = item.len + 1; // +1을 해주는이유는 뭘까?
                    deleteMemoBtn.textContent = "삭제"; // deleteMemoBtn 만들기 
                    deleteMemoBtn.setAttribute("id", item.len); // 속성 할당해주기
                    deleteMemoBtn.setAttribute("onclick", "remove()"); // onclick 하면 삭제할것임
                    colorBtn.textContent = "color"; // colorBtn
                    colorBtn.setAttribute("id", item.len); 
                    colorBtn.setAttribute("onclick", "colorChange()");

                    // display.appendChild(saveId); // display에 자식요소로 추가
                    // li.appendChild
                    const newli = display.appendChild(li);
                    newli.appendChild(saveTitle);
                    newli.appendChild(saveContent);
                    newli.appendChild(btnGroup);
                    // newli.appendChild(deleteMemoBtn);
                    btnGroup.appendChild(colorBtn);
                    btnGroup.appendChild(deleteMemoBtn);
                }

                input.value = '';
                textarea.value = '';
            }

            function remove() {  // remove 함수 생성
                // console.log(event.srcElement.id);
                // console.log(allMemo);
                const idx = allMemo.find(  // 
                    (item) => item.len == event.srcElement.id
                );
                if (idx) {
                    allMemo.splice(
                        allMemo.findIndex((item) => item.len == idx.len),
                        1
                    );
                }
                localStorage.setItem("allMemo", JSON.stringify(allMemo));
                render();
            }

            // colorChange() 만들기
            function colorChange() {  // colorChange

                console.log('hohi');
                render();
            }
