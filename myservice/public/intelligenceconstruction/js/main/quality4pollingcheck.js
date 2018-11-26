/**
 * module：质量管理——质量巡检
 * author：Cohen.Lee
 * date: 2018-11-14
 */

(function () {
    let cacheData = {};
    let cacheDetails = [];
    let popMsgStr = "";
    let popCoordinate = [{
            left: '140px',
            top: '150px'
        },
        {
            left: '240px',
            top: '300px'
        },
        {
            left: '440px',
            top: '100px'
        },
        {
            left: '640px',
            top: '330px'
        },
        {
            left: '880px',
            top: '200px'
        },
    ]
    popMsgStr += '<div class="popup-message"><ul>';
    popMsgStr += '<li><span>子项名：</span><span class="pm_item">食堂</span></li>';
    popMsgStr += '<li><span>问题数：</span><span class="pm_item">5个</span></li>';
    popMsgStr += '<li><span>待整改：</span><span class="pm_item">1个</span></li></ul></div>';

    function renderPopMsgDetails(data) {
        let elems = $('.popup-message-detail .pm_detail');
        elems.get(0).innerHTML = data['questionDescription']
        elems.get(1).innerHTML = data['checkUser']
        elems.get(2).innerHTML = data['rectificationRequire']
        elems.get(3).innerHTML = data['rectificationUser']
        elems.get(4).innerHTML = data['state']
        elems.get(5).innerHTML = data['checkResult']
        elems.get(6).innerHTML = data['accessory']
    }

    function renderQuestionInfo(rootElem, data) {
        if (rootElem) {
            rootElem.empty();
        }
        if (typeof data == 'object' && data instanceof Array && data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                let str = "";
                str += '<div class="row" data-index="' + i + '">';
                str += '<div class="info-img"><img src="' + data[i]['imgUrl'] + '"></div>';
                str += '<div class="info-msg"><div class="info-content">' + data[i]['questionDescription'] + '</div>';
                str += '<div class="info-tilte"><span>' + data[i]['checkUser'] + '</span></div></div></div>';
                let newElem = $(str);
                newElem.on('mouseover', function (event) {
                    $(this).css('background-color', '#0d0e1b').css('border', '0px');
                    $('.popup-message-detail').css('display', 'block');
                    renderPopMsgDetails(cacheDetails[Number($(this).attr('data-index'))]);
                });
                newElem.on('mouseout', function (event) {
                    $(this).css('background-color', '#191a2d').css('border', '1px solid #7e7f89');
                    $('.popup-message-detail').css('display', 'none');
                });
                rootElem.append(newElem);
            }
        } else {
            rootElem.html('<div class="row">没有数据显示，请检查网络或者联系系统管理员！</div>');
        }
    }

    function renderPopMsg(rootElem, cloneTarget, data, left, top, index) {

        let newElem = cloneTarget.clone();
        newElem.attr('data-index', index);
        newElem.on('click', function (event) {
            cacheDetails = cacheData[Number($(this).attr('data-index'))]['questionInfos'];
            renderQuestionInfo($('.quality-polling-check .quality-polling-check-info .panel-body'), cacheData[Number($(this).attr('data-index'))]['questionInfos']);
        })
        newElem.find('.pm_item').get(0).innerHTML = data.subProjectName;
        newElem.find('.pm_item').get(1).innerHTML = data.problemCount + '个';
        newElem.find('.pm_item').get(2).innerHTML = data.awaitRectification + '个';
        newElem.css('position', 'absolute').css('left', left).css('top', top).css('display', 'block');
        rootElem.append(newElem);
    }

    $$.moduleQualityPollingCheck = function () {
        function handler(data) {
            cacheData = data.data;
            for (let i = 0; i < data.data.length; i++){
                renderPopMsg($('.quality-polling-check > .col-sm-8 > .panel-body'),
                    $(popMsgStr),
                    data.data[i],
                    popCoordinate[i]['left'],
                    popCoordinate[i]['top'],
                    i
                );
            }
        }
        $$.ajax($$.baseUrl, $$.moduleUrls.quality4pollingcheck, handler);
    }

})()