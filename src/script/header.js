/**
 * 选择课程管理菜单
 * 
 */
function selectLessonMgMt(){
    // 设置课程管理菜单选中状态
    document.getElementById("lesson-mgmt-menu-id").classList.add("selected");
    document.getElementById("setudent-mgmt-menu-id").classList.remove("selected");
    document.getElementById("download-report-menu-id").classList.remove("selected");

    document.getElementById("lesson-mgmt-area-id").classList.remove("hidden");
    document.getElementById("student-mgmt-area-id").classList.add("hidden");
    document.getElementById("download-report-area-id").classList.add("hidden");

    loadLessonList();
}

/**
 * 选择学员管理菜单项
 */
function selectStudentMgMt(){
    document.getElementById("setudent-mgmt-menu-id").classList.add("selected");
    document.getElementById("lesson-mgmt-menu-id").classList.remove("selected");
    document.getElementById("download-report-menu-id").classList.remove("selected");

    // 查询课程列表, 默认取第一个加载
    queryLessonListProxy(loadStudentOfFirstLesson);

    document.getElementById("lesson-mgmt-area-id").classList.add("hidden");
    document.getElementById("student-mgmt-area-id").classList.remove("hidden");
    document.getElementById("download-report-area-id").classList.add("hidden");
}

/**
 * 选择学员管理菜单，默认加载第一个课程的学员
 * 
 * @param {查询课程列表} result 
 */
function loadStudentOfFirstLesson(result) {
    if (result.data.length != 0) {
        loadStudentOfSelectedLesson(result.data[0].lessonCode);
    } else {
        // 只显示表头
        loadStudentOfSelectedLesson(-1);
    }
}

/**
 * 选中报告下载菜单项
 * 
 */
function selectDownloadReport(){
    document.getElementById("download-report-menu-id").classList.add("selected");
    document.getElementById("lesson-mgmt-menu-id").classList.remove("selected");
    document.getElementById("setudent-mgmt-menu-id").classList.remove("selected");

    document.getElementById("lesson-mgmt-area-id").classList.add("hidden");
    document.getElementById("student-mgmt-area-id").classList.add("hidden");
    document.getElementById("download-report-area-id").classList.remove("hidden");

    loadLessonReport();
}