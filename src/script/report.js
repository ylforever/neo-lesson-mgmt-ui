/**
 * 加载课程报告列表
 */
function loadLessonReport(){
    queryLessonReportProxy(initReportTable);
}

/**
 * 初始化报告表格
 * 
 * @param {查询结果} result 
 */
function initReportTable(result){
    var reportTableHtml = "";
    reportTableHtml += "<tr class='lesson-tr'> "
                    + "<th class='no' scope='col'>序号</th>"
                    + "<th class='file-name-header' scope='col'>报告名称</th>"   
                    + "<th class='state' scope='col'>状态</th>"   
                    + "<th class='create-user email' scope='col'>创建人</th>"   
                    + "<th class='create-time' scope='col'>创建时间</th>"
                + "</tr>"

    var reportDataList = result.data;

    // 循环构建报告列表的每一行数据
    for (var i = 0; i < reportDataList.length; ++i) {
        const report = reportDataList[i];

        reportTableHtml += '<tr id="' + report.reportCode +'" class="lesson-tr">'
                        + '<td class="no">' + (i+1) + '</td>'
                        + '<td class="file-name" onclick="downloadReport(this)">' + report.fileName + '</td>'
                        + '<td class="state">' + report.state + '</td>'
                        + '<td class="create-user email">' + report.createUser + '</td>'
                        + '<td class="create-time">' + report.createTime + '</td>'
                    + '</tr>';
    }

    document.getElementById("lesson-report-id").innerHTML = reportTableHtml;
}

/**
 * 下载报告文件
 * 
 * @param {当前选中的行} item 
 */
function downloadReport(item){
    var reportCode = item.parentNode.id;

    // 调用远程接口下载文件
    downloadReportProxy(reportCode, handleDownloadReport);
}

/**
 * 处理下载报告回调函数
 * 
 * @param {http请求对象} xhr 
 * @returns 
 */
function handleDownloadReport(xhr) {
    return function(){
        if (xhr.status == 200) {
            let blob = xhr.response;
            let a = document.createElement('a');
            let url = window.URL.createObjectURL(blob);
            a.href = url;

            //获取后端文件名称
            let fileName = decodeURI(xhr.getResponseHeader('content-disposition'));

            //截取=字符串后面的内容
            let str = fileName.match(/=(\S*)/)[1];

            a.download = str;
            a.click();
            window.URL.revokeObjectURL(url);
        }
    }
}

/**
 * 生成报告
 */
function generateReport(){
    generateReportProxy();
    loadLessonReport();
}

/**
 * 刷新报告表格数据
 */
function refreshReportTable(){
    loadLessonReport();
}