/**
 * 加载课程列表
 */
function loadLessonList(){
    queryLessonListProxy(initLessonList);
}

/**
 * 初始化课程列表
 * 
 * @param {查询结果} result 
 */
function initLessonList(result){
    var lessonListHtml = "";
    var lessonList = result.data;

    // 循环构建课程列表数据
    for(var i = 0; i < lessonList.length; ++i){
        if (i == 0) {
            lessonListHtml += "<li id=" + lessonList[i].lessonCode + " class='item selected-lesson clearfix'>" 
                                + '<div class="float-left"> <i class="iconfont icon-shanchu" onclick="deleteLesson(this)"></i> </div>'         
                                + '<div class="lesson-name float-left" onclick="selectLesson(this)">' + lessonList[i].name +'</div>'
                                +"</li>";
        } else {
            lessonListHtml += "<li id="+ lessonList[i].lessonCode + " class='item clearfix'>" 
                                + '<div class="float-left"> <i class="iconfont icon-shanchu" onclick="deleteLesson(this)"></i> </div>'         
                                + '<div class="lesson-name float-left" onclick="selectLesson(this)">' + lessonList[i].name +'</div>'
                                + "</li>";
        }
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
 * 选中课程
 * 
 * @param {选择的dom条目} item 
 */
function selectLesson(item) {
    // 去除所有课程的选中记录
    var ulNode = document.getElementById("lesson-list-id");
    for (var i = 0; i < ulNode.childNodes.length; ++i) {
        var child = ulNode.childNodes[i];
        child.classList.remove("selected-lesson");
    }

    // 将当前项设置为选中项
    var selectedliNode = item.parentNode;
    selectedliNode.classList.add("selected-lesson");

    loadStudentOfSelectedLesson();
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
    loadStudentOfSelectedLesson();
    
    var dialog = document.getElementById("add-lesson-dialog-id");
    dialog.classList.add("hidden");
}