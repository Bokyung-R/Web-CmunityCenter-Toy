var iddata = [];
var userData = {};
var idcheck = false;
var loginID;

function login_btn() {
    var user_id = document.getElementById("user_id").value;
    var user_pw = document.getElementById("user_pw").value;

    if (user_id == "admin" && user_pw == "admin00") {
        alert("관리자 모드 로그인");
        loginID = "admin";
        document.getElementById("part1").style.display = "none";
        document.getElementById("part2").style.display = "block";
        document.getElementById("part3").style.display = "none";
        displayQuestionsAnswers();
        return false;
    }

    if (userData[user_id] === user_pw) {
        loginID = user_id;
        alert("로그인 성공");
        document.getElementById("part1").style.display = "none";
        document.getElementById("part2").style.display = "none";
        document.getElementById("part3").style.display = "block";
        displayPrograms(loginID);

    } else {
        alert("아이디 또는 비밀번호가 잘못되었습니다.");
    }
}

function id_check() {
    var setup_id = document.getElementById("setup_id").value;
    if (setup_id == "") {
        alert("아이디를 입력하고 중복체크를 해주세요.");
    } else {
        if (iddata.includes(setup_id)) {
            alert("이미 같은 ID가 등록되어 있습니다.");
        } else {
            var idPattern = /^[a-zA-Z0-9]{5,20}$/;
            if (!idPattern.test(setup_id)) {
                document.querySelector('#checkcom').innerHTML = "아이디는 5~20자의 영문 소문자와 숫자를 사용해야합니다.";
            } else {
                document.querySelector('#checkcom').innerHTML = "사용가능한 아이디입니다.";
                idcheck = true;
            }
        }
    }
}

function submitForm() {
    var setup_id = document.getElementById("setup_id").value;
    var setup_pw = document.getElementById("setup_pw").value;
    var pwPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@^*])(?=.*[^\s]).{5,16}$/;
    if (setup_id == "" || setup_pw == "") {
        alert("ID와 PW를 모두 입력해주세요.");
        return false;
    } else if (!idcheck) {
        alert("아이디 중복체크를 해주세요.");
        return false;
    } else if (!pwPattern.test(setup_pw)) {
        alert("비밀번호는 5~16자의 영문, 숫자, 특수문자(!@^*)를 모두 포함해야 합니다.");
        return false;
    } else {
        iddata.push(setup_id);
        userData[setup_id] = setup_pw;

        alert("회원가입이 완료되었습니다.");
        document.querySelector('form[name="f1"]').reset();
        document.querySelector('#checkcom').innerHTML = "";
        idcheck=false;
        updateTable();
        updateSelectOptions();
        return false;
    }
}

var isOpen = false;
var bigPic = document.querySelector("#pic_program");
var smallPics = document.querySelectorAll(".small");

for (i = 0; i < smallPics.length; i++) {
    smallPics[i].addEventListener("click", function () {
        newPic = this.src;
        bigPic.setAttribute("src", newPic);
    });
}

var view = document.querySelector("#view");
view.addEventListener("click", function () {
    if (isOpen == false) {
        document.querySelector("#detail").style.display = "block";
        view.innerHTML = "상세 설명 닫기";
        isOpen = true;
    }
    else {
        document.querySelector("#detail").style.display = "none";
        view.innerHTML = "상세 설명 보기";
        isOpen = false;
    }
});

var qaList = [];

function addQuestion() {
    var questionInput = document.getElementById("qaInput");
    var question = questionInput.value;
    if (question !== "") {
        qaList.push({ question: question, answer: "" });
        questionInput.value = "";
        displayQuestions();
    }
}

function displayQuestions() {
    var tableBody = document.getElementById("qaTableBody");
    tableBody.innerHTML = "";
    for (var i = 0; i < qaList.length; i++) {
        var row = document.createElement("tr");
        var questionCell = document.createElement("td");
        questionCell.textContent = qaList[i].question;
        row.appendChild(questionCell);
        var answerCell = document.createElement("td");
        answerCell.textContent = qaList[i].answer;
        row.appendChild(answerCell);
        tableBody.appendChild(row);
    }
}

function home() {
    document.getElementById("user_id").value = "";
    document.getElementById("user_pw").value = "";
    document.getElementById("part1").style.display = "block";
    document.getElementById("part2").style.display = "none";
    document.getElementById("part3").style.display = "none";
    document.getElementById("users_pro").value = "";
    var tableBody = document.getElementById("user_programs");
    tableBody.innerHTML = "";
    displayQuestions();
}

//--------------part2--------------------------

function updateTable() {
    var userListElement = document.getElementById("user_list");
    userListElement.innerHTML = "";

    for (var i = 0; i < iddata.length; i++) {
        var userId = iddata[i];
        var password = userData[userId];

        var row = document.createElement("tr");
        var idCell = document.createElement("td");
        var passwordCell = document.createElement("td");

        idCell.textContent = userId;
        passwordCell.textContent = password;

        row.appendChild(idCell);
        row.appendChild(passwordCell);
        userListElement.appendChild(row);
    }
}

function updateSelectOptions() {
    var selectElement = document.getElementById("users_pro");
    selectElement.innerHTML = "";

    var defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.text = "-- 선택 --";
    selectElement.appendChild(defaultOption);

    for (var i = 0; i < iddata.length; i++) {
        var optionElement = document.createElement("option");
        optionElement.value = iddata[i];
        optionElement.textContent = iddata[i];
        selectElement.appendChild(optionElement);
    }
}

function before_watch() {
    var selectElement = document.getElementById("users_pro");
    var selectedId = selectElement.value;
    watchprogram(selectedId);
}

function watchprogram(selectedId) {
    var tableBody = document.getElementById("user_programs");
    tableBody.innerHTML = "";

    var programC = document.createElement("div");
    var ProgramsTable = document.createElement("table");

    if (userPrograms[selectedId]) {
        for (var i = 0; i < userPrograms[selectedId].length; i++) {
            var row = document.createElement("tr");
            var programCell = document.createElement("td");
            var timeCell = document.createElement("td");
            var teacherCell = document.createElement("td");
            var classroomCell = document.createElement("td");
            var delBttn = document.createElement("td");

            programCell.textContent = userPrograms[selectedId][i].program;
            timeCell.textContent = userPrograms[selectedId][i].time;
            teacherCell.textContent = userPrograms[selectedId][i].teacher;
            classroomCell.textContent = userPrograms[selectedId][i].classroom;

            delBttn.setAttribute("class", "del");
            delBttn.innerHTML = '<button onclick="removeProgram2(' + i + ', \'' + selectedId + '\')">삭제</button>';

            row.appendChild(programCell);
            row.appendChild(timeCell);
            row.appendChild(teacherCell);
            row.appendChild(classroomCell);
            row.appendChild(delBttn);
            tableBody.appendChild(row);
        }
    }

    programC.appendChild(ProgramsTable);
    document.getElementById("user_programs").appendChild(programC);
}

function removeProgram2(index, selectedId) {
    userPrograms[selectedId].splice(index, 1);
    alert("삭제되었습니다.");
    watchprogram(selectedId);
}

function add_program() {
    var selectElement = document.getElementById("users_pro");
    var selectedId = selectElement.value;

    var addElement = document.getElementById("add_pro");
    var addId = addElement.value;

    eval(addId + "('" + selectedId + "')");

}

function displayQuestionsAnswers() {
    var tableBody = document.getElementById("qaanswerbody");
    tableBody.innerHTML = "";

    for (var i = 0; i < qaList.length; i++) {
        var row = document.createElement("tr");

        var questionCell = document.createElement("td");
        var answerCell = document.createElement("td");
        var answerTextarea = document.createElement("textarea");
        var enrollCell = document.createElement("td");
        var enrollButton = document.createElement("button");

        questionCell.textContent = qaList[i].question;
        row.appendChild(questionCell);

        answerTextarea.placeholder = "답변을 입력하세요";
        answerTextarea.setAttribute("data-index", i);
        answerTextarea.rows = 4;
        answerTextarea.cols = 30;
        answerTextarea.value = qaList[i].answer;
        answerCell.appendChild(answerTextarea);

        row.appendChild(answerCell);

        enrollButton.textContent = "등록하기";
        enrollButton.addEventListener("click", enrollAnswer.bind(null, i, row, answerTextarea));
        enrollCell.appendChild(enrollButton);

        row.appendChild(enrollCell);
        tableBody.appendChild(row);

        if (qaList[i].answered) { 
            row.style.backgroundColor = "lightgreen";
            answerTextarea.disabled = true;
            enrollButton.textContent = "답변 완료";
        }
    }
}

function enrollAnswer(index, row, answerTextarea) {
    var answer = answerTextarea.value;
    qaList[index].answer = answer;
    qaList[index].answered = true; 
    row.style.backgroundColor = "lightgreen";
    answerTextarea.disabled = true;
    row.querySelector("button").textContent = "답변 완료";
}

displayQuestionsAnswers();

//----------------part3------------>

var userPrograms = {};

displayPrograms(loginID);

function apply(loginID, program, time, teacher, classroom) {
    var applyProgram = {
        program: program,
        time: time,
        teacher: teacher,
        classroom: classroom
    };

    if (!userPrograms[loginID]) {
        userPrograms[loginID] = [];
    }

    if (userPrograms[loginID].some(node => isSameProgram(node, applyProgram))) {
        alert("이미 신청된 프로그램입니다.");
    } else {
        userPrograms[loginID].push(applyProgram);
        alert("신청 / 추가되었습니다")
    }

    displayPrograms(loginID);
    watchprogram(loginID);
}

function apply1(loginID) {
    apply(loginID, '요가01', '오전 09:00 - 10:30', '김요가', 's0101');
}

function apply2(loginID) {
    apply(loginID, '요가02', '오전 11:00 - 12:30', '김요가', 's0101');
}

function apply3(loginID) {
    apply(loginID, '필라테스01', '오전 09:00 - 10:30', '필라희', 's0102');
}

function apply4(loginID) {
    apply(loginID, '필라테스02', '오후 18:00 - 19:30', '필라희', 's0102');
}

function apply5(loginID) {
    apply(loginID, '헬스', '자유', '지정 강사 없음', 's0301');
}


function apply6(loginID) {
    apply(loginID, '배드민턴01', '오후 13:00 - 15:00', '턴', 's0211');
}

function apply7(loginID) {
    apply(loginID, '배드민턴02', '오후 16:00 - 18:00', '턴', 's0211');
}

function apply8(loginID) {
    apply(loginID, '테니스01', '오후 17:00 - 18:30', '테니', 's0212');
}

function apply9(loginID) {
    apply(loginID, '테니스02', '오후 19:00 - 20:30', '테니', 's0212');
}

function apply10(loginID) {
    apply(loginID, '수영01', '오전 09:00 - 10:00', '마린', 'h0102');
}

function apply11(loginID) {
    apply(loginID, '수영02', '오전 11:00 - 12:00', '마린', 'h0102');
}

function displayPrograms(loginID) {
    var nodeTableBody = document.querySelector("#myprogram");
    nodeTableBody.innerHTML = "";

    var programContainer = document.createElement("div");
    programContainer.id = "user_programs_" + loginID;

    var userProgramsTable = document.createElement("table");

    if (userPrograms[loginID]) {
        for (var i = 0; i < userPrograms[loginID].length; i++) {
            var row = document.createElement("tr");
            var programCell = document.createElement("td");
            var timeCell = document.createElement("td");
            var teacherCell = document.createElement("td");
            var classroomCell = document.createElement("td");
            var delBttn = document.createElement("td");

            programCell.textContent = userPrograms[loginID][i].program;
            timeCell.textContent = userPrograms[loginID][i].time;
            teacherCell.textContent = userPrograms[loginID][i].teacher;
            classroomCell.textContent = userPrograms[loginID][i].classroom;

            delBttn.setAttribute("class", "del");
            delBttn.innerHTML = '<button onclick="removeProgram1(' + i + ')">취소</button>';

            row.appendChild(programCell);
            row.appendChild(timeCell);
            row.appendChild(teacherCell);
            row.appendChild(classroomCell);
            row.appendChild(delBttn);
            nodeTableBody.appendChild(row);
        }
    }

    programContainer.appendChild(userProgramsTable);
    document.getElementById("user_programs").appendChild(programContainer);
}

function removeProgram1(index) {
    userPrograms[loginID].splice(index, 1);
    alert("취소되었습니다.");
    displayPrograms(loginID);
}

function isSameProgram(node1, node2) {
    return (
        node1.program == node2.program &&
        node1.time == node2.time &&
        node1.teacher == node2.teacher &&
        node1.classroom == node2.classroom
    );
}