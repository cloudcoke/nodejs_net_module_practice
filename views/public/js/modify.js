const modifyFrm = document.querySelector("#modifyFrm");
const modifyFrmList = document.querySelectorAll("#modifyFrm > div");
const idx = location.search;
const index = location.search.split("=")[1];
const boardsObj = JSON.parse(localStorage.getItem("boards"));
const board = boardsObj[index];

// 게시글의 데이터 값 출력
for (let i = 0; i < modifyFrmList.length; i++) {
  const element = modifyFrmList[i].childNodes[1];
  const id = element.name;
  element.value = board[id];
}

// 작성한 입력 값이 빈 값인지 검사
const isEmpty = (subject, writer, content) => {
  if (subject.length === 0) throw new Error("제목을 입력해주세요");
  if (writer.length === 0) throw new Error("작성자를 입력해주세요");
  if (content.length === 0) throw new Error("내용을 입력해주세요");
};

// 수정완료 버튼
const modifyHandler = (e) => {
  e.preventDefault();
  const subject = e.target.subject.value;
  const writer = e.target.writer.value;
  const content = e.target.content.value;

  try {
    isEmpty(subject, writer, content);
    board.subject = subject;
    board.writer = writer;
    board.content = content;

    const boardsStr = JSON.stringify(boardsObj);
    localStorage.setItem("boards", boardsStr);
    location.href = "../../board/view.html" + idx;
  } catch (e) {
    alert(e.message);
    console.error(e);
  }
};

const backBtn = document.querySelector("#back");

// 뒤로가기 버튼
const backBtnHandler = (e) => {
  location.href = document.referrer;
};

modifyFrm.addEventListener("submit", modifyHandler);
backBtn.addEventListener("click", backBtnHandler);
