/**
 * 加载课程列表
 */
function loadLessonList(){
    queryLessonListProxy(initLessonList);
}

/**
 * 初始化课程表
 * 
 * @param {查询结果} result 
 */
function initLessonList(result){
    var lessonListHtml = "";
    lessonListHtml += "<tr> "
                    + "<th class='operator'>序号</th>"
                    + "<th class='operator'>操作</th>"
                    + "<th class='lesson' scope='col'>课程</th>"   
                    + "<th class='total-surplus-lesson-num' scope='col'>总剩余课时</th>" 
                    + "<th class='teacher email'>指导老师</th>"  
                    + "<th class='create-user email' scope='col'>创建人</th>"   
                    + "<th class='create-time' scope='col'>创建时间</th>"
                + "</tr>"

    var lessonList = result.data;

    // 循环构建课程列表数据
    for(var i = 0; i < lessonList.length; ++i){
        const lesson = lessonList[i];

        lessonListHtml += '<tr id="' + lesson.lessonCode +'">'
                            + '<td>' + (i+1) + '</td>'
                            + '<td class="operator">'
                            + '<button class="operator-btn" onclick="deleteLesson(this)">删除</button></td>'
                            + '<td class="lesson" onclick="clickLessonName(this)">' + lesson.name + '</td>'
                            + '<td class="total-surplus-lesson-num">' + 0 + '</td>'
                            + '<td class="teacher email">' + 'yzy4101@163.com' + '</td>'
                            + '<td class="create-user email">' + lesson.createUser + '</td>'
                            + '<td class="create-time">' + lesson.createTime + '</td>'
                        + '</tr>';
    }

    document.getElementById("lesson-list-id").innerHTML = lessonListHtml;
}

/**
 * 删除课程
 * 
 * @param {选择的dom条目} item 
 */
function deleteLesson(item){
    var lessonNode = item.parentNode.parentNode;
    const lessonCode = lessonNode.id;

    // 删除课程
    deleteLessonProxy(lessonCode);

    // 重新加载课程树
    loadLessonList();
}

/**
 * 显示添加课程对话框
 */
function showAddLessonDialog(){
    var dialog = document.getElementById("add-lesson-dialog-id");
    dialog.classList.remove("hidden");
}

/**
 * 取消添加课程
 */
function cancelAddLesson(){
    var dialog = document.getElementById("add-lesson-dialog-id");
    dialog.classList.add("hidden");
}

/**
 * 确定添加课程
 */
function confirmAddLesson(){
    var lessonName = document.getElementById("add-lesson-dialog-name-id").value;
    var lesson = {
        "name": lessonName
    }

    insertLessonProxy(lesson, addLessonCallbackFun);
}

/**
 * 添加课程回调函数
 * 
 * @param {添加课程返回结果} result 
 */
function addLessonCallbackFun(result) {
    const lessonCode = result.data;

    // 1、刷新课程列表
    loadLessonList();

    // 2、设置新加的课程为选中状态
    var ulNode = document.getElementById("lesson-list-id");
    for (var i = 0; i < ulNode.childNodes.length; ++i) {
        var child = ulNode.childNodes[i];
        child.classList.remove("selected-lesson");

        if (child.id == lessonCode){
            child.classList.add("selected-lesson")
        }
    }

    // 3、刷新学员表
    loadStudentOfSelectedLesson(lessonCode);
    
    var dialog = document.getElementById("add-lesson-dialog-id");
    dialog.classList.add("hidden");
}

/**
 * 点击课程名称
 * 
 * @param {点击的课程名称} item 
 */
function clickLessonName(item) {
  const lessonCode = item.parentNode.id;

  document.getElementById("setudent-mgmt-menu-id").classList.add("selected");
  document.getElementById("lesson-mgmt-menu-id").classList.remove("selected");
  document.getElementById("download-report-menu-id").classList.remove("selected");

  document.getElementById("lesson-mgmt-area-id").classList.add("hidden");
  document.getElementById("student-mgmt-area-id").classList.remove("hidden");
  document.getElementById("download-report-area-id").classList.add("hidden");

  // 查询课程列表, 默认取第一个加载
  loadStudentOfSelectedLesson(lessonCode);
}