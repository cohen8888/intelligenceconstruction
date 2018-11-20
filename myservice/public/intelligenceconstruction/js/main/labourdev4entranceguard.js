/**
 * module:劳务实名制管理——实名制管理
 * author:Cohen.Lee
 * date:2018-11-15
 */
(function () {
    /**
     * 渲染实名制门禁管理列表
     * @param {*} rootElem 
     * @param {*} data 
     */
    function renderTableInfo(rootElem, data) {
        let str = "";
        if (typeof data == 'object' && data instanceof Array && data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                str += '<tr>';
                str += '<td>' + data[i]['workNo'] + '</td>';
                str += '<td>' + data[i]['name'] + '</td>';
                str += '<td>' + data[i]['gender'] + '</td>';
                str += '<td>' + data[i]['company'] + '</td>';
                str += '</tr>';
            }
        } else {
            str += '<tr><td colspan="3" style="text-align:center;">没有数据显示，请检查网络或者联系系统管理员！</td></tr>';
        }
        rootElem.html(str);
    }

    $$.moduleLabourEntranceguard = function () {
        function handler(data) {
            renderTableInfo($('.labour-entranceguard-info .table tbody'), data.data.workerInfos);
            $('#currentWorker').html(data.data.globalInfo.currentWorker);
            $('#grandTotalWorker').html(data.data.globalInfo.grandTotalWorker);
        }
        $$.ajax($$.baseUrl, $$.moduleUrls.labourdev4entranceguard, handler);
    }

})()