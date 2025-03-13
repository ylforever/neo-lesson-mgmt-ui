/**
 * 远程接口调用代理类
 */
// var SERVICE_ADDRESS = "http://47.107.248.50:9527";
// var SERVICE_ADDRESS = "http://localhost:9527";
var SERVICE_ADDRESS = "http://localhost";
// var SERVICE_ADDRESS = "http://192.168.193.7";
// var SERVICE_ADDRESS = "http://47.107.248.50";

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

    const token = localStorage.getItem("jwt-token");
    xhr.setRequestHeader('jwt-token', token);

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
    
    const token = localStorage.getItem("jwt-token");
    xhr.setRequestHeader('jwt-token', token);

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
    
    const token = localStorage.getItem("jwt-token");
    xhr.setRequestHeader('jwt-token', token);

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
    
    const token = localStorage.getItem("jwt-token");
    xhr.setRequestHeader('jwt-token', token);

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
    
    const token = localStorage.getItem("jwt-token");
    xhr.setRequestHeader('jwt-token', token);

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
    
    const token = localStorage.getItem("jwt-token");
    xhr.setRequestHeader('jwt-token', token);

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
    
    const token = localStorage.getItem("jwt-token");
    xhr.setRequestHeader('jwt-token', token);

    xhr.send();
}

/**
 * 插入课程接口代理
 * 
 * @param {课程对象} lesson 
 * @param {回调函数} handlerFun 
 */
function insertLessonProxy(lesson, handlerFun){
    var xhr = new XMLHttpRequest();
    var requestPath = SERVICE_ADDRESS + "/neo-lesson-mgmt/v1/lesson/insert-lesson";
    xhr.onload = handleResult(xhr, handlerFun);

    xhr.open("POST", requestPath, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    const token = localStorage.getItem("jwt-token");
    xhr.setRequestHeader('jwt-token', token);

    const lessonJson = JSON.stringify(lesson);
    xhr.send(lessonJson);
}

/**
 * 发送验证码到用户的账号邮箱
 *  
 * @param {邮箱账号} account 
 */
function sendVerifyCodeProxy(account){
    var xhr = new XMLHttpRequest();
    var requestPath = SERVICE_ADDRESS + "/neo-lesson-mgmt/v1/login/generate-verify-code";

    xhr.open("POST", requestPath, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(account);
}

/**
 * 登录接口代理
 * 
 * @param {用户登录数据} userLogin 
 * @param {回调处理函数} handlerFun 
 */
function loginProxy(userLogin, handlerFun){
    var xhr = new XMLHttpRequest();
    var requestPath = SERVICE_ADDRESS + "/neo-lesson-mgmt/v1/login/login-in";
    xhr.onload = handleResult(xhr, handlerFun);

    xhr.open("POST", requestPath, false);
    xhr.setRequestHeader('Content-Type', 'application/json');

    const userLoginJson = JSON.stringify(userLogin);
    xhr.send(userLoginJson);
}


/**
 * 查询课程报告代理接口
 * 
 * @param {回调结果处理函数} handleFun 
 */
function queryLessonReportProxy(handlerFun){
    var xhr = new XMLHttpRequest();
    var requestPath = SERVICE_ADDRESS + "/neo-lesson-mgmt/v1/report/query-lesson-report";
    xhr.onload = handleResult(xhr, handlerFun);

    xhr.open("GET", requestPath, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    const token = localStorage.getItem("jwt-token");
    xhr.setRequestHeader('jwt-token', token);

    xhr.send();
}


/**
 * 下载报告文件
 * 
 * @param {报告编码} reportCode 
 */
function downloadReportProxy(reportCode, handleDownloadReport) {
    var xhr = new XMLHttpRequest();
    var requestPath = SERVICE_ADDRESS + "/neo-lesson-mgmt/v1/report/download-report/" + reportCode;
    xhr.onload = handleDownloadReport(xhr);
    xhr.responseType = 'blob';

    xhr.open("GET", requestPath, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    const token = localStorage.getItem("jwt-token");
    xhr.setRequestHeader('jwt-token', token);

    xhr.send();
}

/**
 * 生成报告代理接口
 */
function generateReportProxy(){
    var xhr = new XMLHttpRequest();
    var requestPath = SERVICE_ADDRESS + "/neo-lesson-mgmt/v1/report/generate-report";

    xhr.open("POST", requestPath, false);
    xhr.setRequestHeader('Content-Type', 'application/json');

    const token = localStorage.getItem("jwt-token");
    xhr.setRequestHeader('jwt-token', token);

    xhr.send();
}

/**
 * 删除报告
 * 
 * @param {报告编码} reportCode 
 * @param {结果处理函数} handlerFun 
 */
function deleteReportProxy(reportCode, handlerFun){
    var xhr = new XMLHttpRequest();
    var requestPath = SERVICE_ADDRESS + "/neo-lesson-mgmt/v1/report/delete-report/" + reportCode;
    xhr.onload = handleResult(xhr, handlerFun);

    xhr.open("DELETE", requestPath, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    const token = localStorage.getItem("jwt-token");
    xhr.setRequestHeader('jwt-token', token);

    xhr.send();
}