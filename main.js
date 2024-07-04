// 랜덤번호 지정
// 유저가 번호를 입력한다, go 버튼 누름
// 만약에 유저가 랜덤번호를 맞추면, 맞췄습니다.
// 랜덤번호 < 유저번호 Down
// 랜덤번호 > 유저번호 Up
// Rest 버튼을 누르면 게임이 리셋
// 5번의 기회를 다 쓰면 게임이 끝난다 (더 이상 추측 불가, 버튼이 disable)
// 유저가 1~100 범위 밖의 숫자를 입력하면 알려준다. 기회 차감X
// 유저가 이미 입력한 숫자를 또 입력하면 알려준다, 기회 차감 X

let computerNum = 0;
let playButton = document.getElementById("play_button");
let userInput = document.getElementById("user_input");
let resultArea = document.getElementById("result_area");
let resetButton = document.getElementById("reset_button");
let chances = 3;
let gameOver = false;
let chanceArea = document.getElementById("chance_area");
let history = [];
let answerArea = document.getElementById("answer_area");
// document(website) 에서 Id를 선택한다
// getElementByClassName, qeurySelector: id, class 태그 등 다양한 방식으로 선택
playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function () {
  userInput.value = ""; // 익명의 함수 사용 - 이번만 일회성으로 사용하기때문에
});
userInput.addEventListener("keydown", function(event) {
  if (event.key === 'Enter') {
    play(); // "Enter" 키를 눌렀을 때 처리할 함수 호출
  }
}); // "Enter"키로 입력하는 기능

// playButton에 이벤트 "click"을 넣어준다, play라는 함수를 실행해라
// play 함수를 매개변수로 넣음 **
// addEventListener(이벤트 이름, 이벤트 발생시 실행함수)
// 이벤트 이름에 focus, mouseover 등등 들어갈수있음
function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1;
  // Math.random()는 0-1 사이의 숫자를 반환 (1은 포함이 안되는 1에 가까운 소수점으로 반환)
  // 1은 포함이 안되기 때문에 * 100 해도 0-99
  // 소수점을 1-100 사이의 숫자로 만들기 위해 * 100
  // +1을 하면 전체 범위가 0-99에서 1-100으로 변경
  // 소수점을 버리기 위해 Math.floor로 전체를 감싸줌
  console.log("정답", computerNum);
  answerArea.textContent = `정답은 ${computerNum}번`;
}

function play() {
  let userValue = userInput.value;

  if (userValue < 1 || userValue > 100) {
    resultArea.textContent = "1과 100 사이의 숫자를 입력해주세요";
    return; // 함수를 끝냄, chances -- 가 작동하지 않아 횟수차감안됨
  }
  // 유저 값 유효성 검사 1
  if (history.includes(userValue)) {
    resultArea.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력해주세요";
    return;
  }
  // 유저 값 유효성 검사 2

  chances--; // 남은 기회 차감
  chanceArea.textContent = `남은기회는 ${chances}번`;
  // 동적인 값과 정적인 값을 같이 쓰는 방식 `` (중요중요)
  console.log("chance", chances);

  if (userValue < computerNum) {
    resultArea.textContent = "Up!!";
  } else if (userValue > computerNum) {
    resultArea.textContent = "Down~~";
  } else {
    resultArea.textContent = "정답입니다";
    gameOver = true;
  }

  history.push(userValue);
  console.log(history);

  if (chances < 1) {
    gameOver = true;
    playButton.disabled = true;
  }
  // if (gameOver) {
  //   playButton.disabled = true;
  // }
  userInput.value = '';
}

function reset() {
  userInput.value = ""; // user input창이 깨끗하게 정리
  pickRandomNum(); // 새로운 번호가 생성
  resultArea.textContent = "retry!";
  playButton.disabled = false; 
  history = []; // 입력한 숫자 기록 초기화
  chances = 3; // 기회 초기화
  chanceArea.textContent = `남은 기회는 ${chances}번 입니다`
}


pickRandomNum();
