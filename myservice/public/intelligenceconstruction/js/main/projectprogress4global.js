/**
 * module：总进度
 * author：Cohen.lee
 * date：2018-11-13
 *
 */
(function () {
    /**
     * 渲染总进度表格数据
     */
    function renderTable(rootElem, data) {
        let str = "";
        if (typeof data == 'object' && data instanceof Array && data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                str += "<tr>";
                str += "<td>" + data[i]['taskName'] + "</td>";
                str += "<td>" + data[i]['projectPeriod'] + "</td>";
                str += "<td>" + data[i]['startDatetime'] + "</td>";
                str += "<td>" + data[i]['completeDate'] + "</td>";
                str += "</tr>";
            }
        } else {
            str += '<tr><td colspan="4" style="text-align:center;">没有数据显示，请检查网络或者联系系统管理员！</td></tr>';
        }
        rootElem.html(str);
    }

    /**
     * 渲染任务信息
     */
    function renderTaskInfo(rootElem, data) {
        let str = "";
        if (typeof data == 'object' && data instanceof Array && data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                str += "<p><h5>" + data[i]['taskName'] + "</h5>";
                str += "<ul><li><span>总工期：</span><span>" + data[i]['globalPeriod'] + "</span></li>";
                str += "<li><span>已完成工期：</span><span>" + data[i]['completePeriod'] + "</span></li></ul></p>";
            }
        } else {
            str += "<p>没有数据显示，请检查网络或者联系系统管理员！</p>";
        }
        rootElem.html(str);
    }

    $$.moduleGlobalProgress = function () {
        function handler(data) {
            renderTable($('.progress-global-table tbody'), data.data.globalprogress);
            renderTaskInfo($('.task-info'), data.data.taskInfo);
        }
        $$.ajax($$.baseUrl, $$.moduleUrls.globalprogress, handler);
    }
})();
