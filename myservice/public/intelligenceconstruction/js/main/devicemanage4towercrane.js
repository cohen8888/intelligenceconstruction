/**
 * module: 设备管理——塔吊
 * author:  Cohen.Lee
 * date:  2018-11-14
 */

 (function(){

    let cacheData = {};

    /**
     * 渲染塔吊基本信息
     */
    function renderTowerCraneTableInfo(rootElem, data){
        let str = "";
        if (typeof data == 'object' && data instanceof Array && data.length > 0 ){
            data.forEach((item, index) => {
                cacheData[item['name']] = item;
                str += `<tr data-name="${item['name']}">`;
                str += `<td>${item['name']}</td>`;
                str += `<td>${item['model']}</td>`;
                str += `<td>${item['manufacturer']}</td>`;
                str += `<td>${item['linker']}</td>`;
                str +=`</tr>`;
            });
        }else{
            str += `<tr><td colspan="3" style="text-align:center;">没有数据显示，请检查网络或者联系系统管理员！</td></tr>`;
        }
        rootElem.html(str);
    }

    $$.moduleDevicemanageTowercrane = function(){
        $$.ajax($$.baseUrl, $$.moduleUrls.devicemanage4towercrane).then((res)=>{
            renderTowerCraneTableInfo($('.tower-crane-table .table tbody'), res.data.towerCraneInfo);
            $('.tower-crane-table table').on('mouseover', function(event){
                let key = event.target.parentNode.getAttribute('data-name');
                if (key){
                    let str = "";
                    //str += `<div class="popup-message">`;
                    str += `<ul>`;
                    str += `<li class="popup-title">基本信息</li>`;
                    str += `<li><span>名称：</span><span>${cacheData[key]['name']}</span></li>`;
                    str += `<li><span>型号/规格：</span><span>${cacheData[key]['model']}</span></li>`;
                    str += `<li><span>厂家：</span><span>${cacheData[key]['manufacturer']}</span></li>`;
                    str += `<li><span>联系人：</span><span>${cacheData[key]['linker']}</span></li>`;
                    str += `<li><span>联系电话：</span><span>${cacheData[key]['linkerPhone']}</span></li>`;
                    str += `<li class="popup-title">巡检记录</li>`;
                    str += `<li><span>检查时间：</span><span>${cacheData[key]['checkDate']}</span></li>`;
                    str += `<li><span>检查人：</span><span>${cacheData[key]['checkUser']}</span></li>`;
                    str += `</ul>`;
                    //str += `</div>`;
                    $('.popup-message ul').remove();
                    $('.popup-message').append($(str));
                    $('.popup-message').css('display', 'block');
                }
            });
            $('.tower-crane-table table').on('mouseout', function(event){
                $(".devicemanage-towercrane .popup-message").css('display', 'none');
            });
        });
    }

})()