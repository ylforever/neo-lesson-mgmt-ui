
// 记录当前选中的课程编码
var CURRENT_LESSON_CODE;

// 记录当前操作的学员编码
var CURRENT_STUDENT_CODE;

/**
 * 加载选中课程包含的学员
 */
function loadStudentOfSelectedLesson(){
    // 1、获取选中的课程编码
    const lessonList = document.getElementsByClassName("selected-lesson");
    if (lessonList.length == 0) {
        return;
    }

    // DOM的id保存的是课程编码
    const lessonCode = lessonList[0].id;
    CURRENT_LESSON_CODE = lessonCode;
    
    // 2、查询课程包含的学员更新表格
    var pageVo = {
        "pageNo": 1,
        "amount": 50
      }
    
    queryStudentByPageProxy(initStudentTable, pageVo, lessonCode);
}


/**
 * 初始化学员列表
 * 
 * @param {查询结果} result 
 */
function initStudentTable(result){
    var studentHtml = "";
    studentHtml += "<tr> "
                    + "<th class='operator'>序号</th>"
                    + "<th class='operator'>操作</th>"
                    + "<th class='name' scope='col'>姓名</th>"
                    + "<th class='lesson'>课程</th>"    
                    + "<th class='lesson-num' scope='col'>剩余课时</th>"  
                    + "<th class='email' scope='col'>email</th>"   
                + "</tr>"
    var studentList = result.data.dataList;
    for(var i = 0; i < studentList.length; ++i){
        const student = studentList[i];
        studentHtml += '<tr id="' + student.studentCode +'">'
                        + '<td>' + (i+1) + '</td>'
                        + '<td class="operator clearfix">'
                        + '<button class="operator-btn float-left" onclick="deleteStudent(this)">删除</button>'
                        +' <button class="operator-btn float-left" onclick="increaseLessonNum(this)">加课时</button>'
                        +' <button class="float-left" onclick="decreaseLessonNum(this)">减课时</button></td>'
                        + '<td class="name">' + student.name + '</td>'
                        + '<td class="lesson">' + student.lessonName +'</td>'
                        + '<td class="lesson-num">' + student.surplusLessonNum + '</td>'
                        + '<td class="email">' + student.email +'</td>'
                    + '</tr>';
    }

    document.getElementById("student-table-id").innerHTML = studentHtml;
}

/**
 * 显示添加学员对话框
 */
function showAddStudentDialog(){
    var dialog = document.getElementById("add-student-dialog-id");
    dialog.classList.remove("hidden");
}

/**
 * 取消添加学员
 */
function cancelAddStudent(){
    document.getElementById("add-student-dialog-id").classList.add("hidden");
}

/**
 * 确定添加学员
 */
function confirmAddStudent(){
    var name =  document.getElementById("add-student-dialog-name-id").value;
    var surplusLessonNum = document.getElementById("add-student-dialog-surplus-lesson-num-id").value;
    var email = document.getElementById("add-student-dialog-email-id").value;

    var student = {
        "lessonCode": CURRENT_LESSON_CODE,
        "name": name,
        "surplusLessonNum": surplusLessonNum,
        "email": email
    }

    insertStudentProxy(student);
    loadStudentOfSelectedLesson();

    // 关闭对话框
    document.getElementById("add-student-dialog-id").classList.add("hidden");
}

/**
 * 删除学员
 * 
 * @param {删除按钮} item 
 */
function deleteStudent(item){
    var studentRow = item.parentNode.parentNode;
    const studentCode = studentRow.id;

    deleteStudentProxy(CURRENT_LESSON_CODE, studentCode);
    loadStudentOfSelectedLesson();
}

/**
 * 弹出加课时对话框
 * 
 * @param {加课时按钮对象} item 
 */
function increaseLessonNum(item){
    var studentRow = item.parentNode.parentNode;
    CURRENT_STUDENT_CODE = studentRow.id;

    var dialog = document.getElementById("increase-less-num-dialog-id");
    dialog.classList.remove("hidden");
}

/**
 * 取消增加课时
 */
function cancelIncreaseLessNum(){
    document.getElementById("increase-less-num-dialog-id").classList.add("hidden");
}

/**
 * 确认增加课时
 */
function confirmIncreaseLessNum(){
    var incrLessonNum = document.getElementById("increase-less-num-dialog-lesson-num-id").value;

    increaseLessonNumProxy(CURRENT_LESSON_CODE, CURRENT_STUDENT_CODE, incrLessonNum);
    loadStudentOfSelectedLesson();

    document.getElementById("increase-less-num-dialog-id").classList.add("hidden");
}

/**
 * 弹出扣减课时对话框
 * 
 * @param {减课时按钮} item 
 */
function decreaseLessonNum(item){
    var studentRow = item.parentNode.parentNode;
    CURRENT_STUDENT_CODE = studentRow.id;

    var dialog = document.getElementById("decrease-less-num-dialog-id");
    dialog.classList.remove("hidden");
}

/**
 * 取消减课时
 */
function cancelDecreaseLessNum(){
    document.getElementById("decrease-less-num-dialog-id").classList.add("hidden");
}

/**
 * 确认扣减课时
 */
function confirmDecreaseLessNum(){
    var incrLessonNum = document.getElementById("decrease-less-num-dialog-lesson-num-id").value;

    decreaseLessonNumProxy(CURRENT_LESSON_CODE, CURRENT_STUDENT_CODE, incrLessonNum);
    loadStudentOfSelectedLesson();

    document.getElementById("decrease-less-num-dialog-id").classList.add("hidden");
}