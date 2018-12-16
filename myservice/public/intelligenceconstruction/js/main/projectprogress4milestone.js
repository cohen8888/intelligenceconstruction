/**
 * module：进度管理——里程碑
 * author：Cohen.Lee
 * date：2018-11-20
 * 
 */

 (function(){
    let datas = [
        {
            "progressNo":"pn00001",
            "imgUrl":"images/milestone_01.png",
            "projectDate":"2018年1月",
            "description":"进入场地"
        },
        {
            "progressNo":"pn00002",
            "imgUrl":"images/milestone_02.png",
            "projectDate":"2018年2月",
            "description":"临建完成"
        },
        {
            "progressNo":"pn00003",
            "imgUrl":"images/milestone_03.png",
            "projectDate":"2018年3月",
            "description":"完成地面"
        },
        {
            "progressNo":"pn00004",
            "imgUrl":"images/milestone_04.png",
            "projectDate":"2018年10月",
            "description":"全部结构完成"
        },
        {
            "progressNo":"pn00005",
            "imgUrl":"images/milestone_05.png",
            "projectDate":"2019年2月",
            "description":"外立面完成"
        },
        {
            "progressNo":"pn00006",
            "imgUrl":"images/milestone_06.png",
            "projectDate":"2019年6月",
            "description":"竣工"
        }
    ];


    $$.moduleProjectprogressMilestone = function(){
        function handler(data){
            let contentElements = $('.projectprogress-milestone .elem-content');
            contentElements.each(function(index, elem){
                let obj = data[index];
                elem.children[0].src = obj.imgUrl;
                (function(imageNo){
                    $(elem.children[0]).on('click', function (event){
                        $(this).parents('.projectprogress-milestone-content').css('display', 'none');
                        $('#gisDiv').css('position', 'absolute').css('left', '240px').css('top', '160px');
                        $('#renderControl').css('width', '1652px').css('height', '890px');
                        console.log(imageNo);
                    });
                })(index + 1);
                elem.children[1].innerHTML = obj.projectDate + "<br/>" + obj.description;
            });
        }
        handler(datas);
        // $$.ajax($$.baseUrl, $$.moduleUrls.projectprogress4milestone, handler);
    }
 })()