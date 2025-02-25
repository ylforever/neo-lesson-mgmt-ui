/**
 * 远程接口调用代理类
 */
var SERVICE_ADDRESS = "http://47.107.248.50:9527";
// var SERVICE_ADDRESS = "http://localhost:9527";

/**
 * 处理rest请求结果
 * 
 * @param {Http请求} xhr 
 * @param {回调处理函数} handlerFun 
 * @returns 函数对象
 */
function handleResult(xhr, handlerFun){
    return function() {
        var result = JSON.parse(xhr.responseText);
        handlerFun(result);
    }
}

/**
 * 获取课程列表
 */
function queryLessonListProxy(handlerFun){
    var xhr = new XMLHttpRequest();
    var requestPath = SERVICE_ADDRESS + "/neo-lesson-mgmt/v1/lesson/query-lesson-list";
    xhr.onload = handleResult(xhr, handlerFun);

    // 查询课程数据同步执行。因学员数据查询依赖于选择的课程。
    xhr.open("GET", requestPath, false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('account', 'neo');

    xhr.send();
}

/**
 * 分页查询学生信息列表
 * 
 * @param {回调函数} handlerFun 
 * @param {分页条件} pageVo 
 * @param {课程编码} lessonCode 
 */
function queryStudentByPageProxy(handlerFun, pageVo, lessonCode) {
    var xhr = new XMLHttpRequest();
    var requestPath = SERVICE_ADDRESS + "/neo-lesson-mgmt/v1/student/query-student-by-page/" + lessonCode;
    xhr.onload = handleResult(xhr, handlerFun);

    xhr.open("POST", requestPath, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('account', 'neo');

    const pageVoJson = JSON.stringify(pageVo);
    xhr.send(pageVoJson);
}

/**
 * 删除课程数据代理接口
 * 
 * @param {课程编码} lessonCode 
 */
function deleteLessonProxy(lessonCode){
    var xhr = new XMLHttpRequest();
    var requestPath = SERVICE_ADDRESS + "/neo-lesson-mgmt/v1/lesson/delete-lesson/" + lessonCode;

    xhr.open("DELETE", requestPath, false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('account', 'neo');

    xhr.send();
}

/**
 * 插入学员数据
 * 
 * @param {学员数据} student
 */
function insertStudentProxy(student){
    var xhr = new XMLHttpRequest();
    var requestPath = SERVICE_ADDRESS + "/neo-lesson-mgmt/v1/student/insert-student";

    xhr.open("POST", requestPath, false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('account', 'neo');

    const studentJson = JSON.stringify(student);
    xhr.send(studentJson);
}

/**
 * 删除学员数据代理接口
 * 
 * @param {课程编码} lessonCode 
 * @param {学员编码} studentCode 
 */
function deleteStudentProxy(lessonCode, studentCode){
    var xhr = new XMLHttpRequest();
    var requestPath = SERVICE_ADDRESS + "/neo-lesson-mgmt/v1/student/delete-student/" + lessonCode + "/" + studentCode;

    xhr.open("DELETE", requestPath, false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('account', 'neo');

    xhr.send();
}

/**
 * 增加课时数量代理接口
 * 
 * @param {课程编码} lessonCode 
 * @param {学员编码} studentCode 
 * @param {课时数量} lessonNum 
 */
function increaseLessonNumProxy(lessonCode, studentCode, lessonNum){
    var xhr = new XMLHttpRequest();
    var requestPath = SERVICE_ADDRESS + "/neo-lesson-mgmt/v1/student/increase-lesson-num/" + lessonCode 
                    + "/" + studentCode + "/" + lessonNum;

    xhr.open("POST", requestPath, false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('account', 'neo');

    xhr.send();
}

/**
 * 扣减课时数量代理接口
 * 
 * @param {课程编码} lessonCode 
 * @param {学员编码} studentCode 
 * @param {课时数量} lessonNum 
 */
function decreaseLessonNumProxy(lessonCode, studentCode, lessonNum){
    var xhr = new XMLHttpRequest();
    var requestPath = SERVICE_ADDRESS + "/neo-lesson-mgmt/v1/student/decrease-lesson-num/" + lessonCode 
                    + "/" + studentCode + "/" + lessonNum;

    xhr.open("POST", requestPath, false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('account', 'neo');

    xhr.send();
}

