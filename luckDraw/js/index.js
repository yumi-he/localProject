$(function () {
    var $ring = $(".ring"),
        $prize = $(".prize"),//转盘
        $btn = $("#btn"),//按钮
        $mask = $("#mask"),//红包遮罩层
        $change = $("#change"),//显示剩余抽奖机会
        $wringName = $("#wring-name"),//中奖弹窗名字
        $li = $(".scroll li"),//中奖信息滚动的盒子
        $sNum = $(".start-num"),//手机头号，三位数
        $eNum = $(".end-num"),//手机尾号，四位数
        $info = $(".info"),//中奖提示信息
        // data = {count: 2},//次数
        total_number,//抽奖总次数
        now_number,//抽奖剩余次数
        bool = false,//判断是否在旋转，true表示是，false表示否
        timer,//定时器
        urlcommon = 'http://app.kouhigh.top/app',//测试
        drawNameArray = [],//中奖内容
        drawIdArray = [],//抽中概率
        winningPrizeiD,//抽中id
        myWinningList,//我的奖品列表
        winningPrizeName;//抽中名称

    init();
    function init() {
        draw_prize_list();//中奖轮播
        draw_prize_num();//抽奖次数
        // draw_winning_prize();//抽奖
        draw_winning_name_list();//抽奖名单
        draw_winning_list();//我的奖品列表

        timer = setInterval(function () {
            $ring.toggleClass("light");
        }, 1000);
        // $prize.removeClass("running");
        $change.html(now_number);//抽奖次数
    }

    //中奖轮播
    function draw_prize_list() {
         
        $.ajax({
            type: "post",
            dataType: "json",
            url: urlcommon + "/activity/draw_prize_list",
            data: {
                draw_id: 8,
                t: 3,
                // token:"5541e09ebc1dc8c1720f5463df9513e7ffeac851"
            },
            async: false,
            success: function (data) {

                var drawData = data.content;
                
                // 抽中概率
                for(var i=0;i<drawData.length;i++){
                    drawIdArray.push(parseInt(drawData[i].id));
                };
                // 中奖内容
                for(var i=0;i<drawData.length;i++){
                    drawNameArray.push(drawData[i].name);
                };
            }
        });
    };

    // 抽奖次数
    function draw_prize_num() {
        
        $.ajax({
            type: "post",
            dataType: "json",
            url: urlcommon + "/activity/draw_customer_count",
            data: {
                draw_id: 8,
                t: 3,
                token:"5541e09ebc1dc8c1720f5463df9513e7ffeac851"
            },
            async: false,
            success: function (event) {

                total_number = parseInt(event.content.total_number);//抽奖总次数

                now_number = parseInt(event.content.now_number);//抽奖剩余次数

                // localStorage.setItem("total_number",total_number);


            }
        });
    };

    // 抽中礼品
    function draw_winning_prize() {
        
        $.ajax({
            type: "post",
            dataType: "json",
            url: urlcommon + "/activity/draw",
            data: {
                draw_id: 8,
                t: 3,
                token:"5541e09ebc1dc8c1720f5463df9513e7ffeac851"
            },
            async: false,
            success: function (data) {

                winningPrizeiD = parseInt(data.content.id);
                winningPrizeName = data.content.name;
                
                $wringName.html(winningPrizeName);

            }
        });
    };
    // 抽奖轮播
    function draw_winning_name_list() {
        
        $.ajax({
            type: "post",
            dataType: "json",
            url: urlcommon + "/activity/draw_prizes_banner",
            data: {
                draw_id: 8,
                t: 3,
            },
            async: false,
            success: function (data) {

           
                var winningList = data.content;
                for(var i=0;i<winningList.length;i++){
                    var winningLName = winningList[i].customer_email.substr(0, 3);
                    
                    $(".scroll_box ul").append('<li>恭喜<span>'+winningLName+'</span>****获得<span class="info">'+winningList[i].prize_name+'</span>一份</li>');
                };


            }
        });
    };
    // 我的奖品列表
    function draw_winning_list() {
        
        $.ajax({
            type: "post",
            dataType: "json",
            url: urlcommon + "/activity/draw_prizes_list",
            data: {
                draw_id: 8,
                t: 3,
                token:"5541e09ebc1dc8c1720f5463df9513e7ffeac851",
            },
            async: false,
            success: function (data) {

                myWinningList = data.content;
                
                for(var i=0;i<myWinningList.length;i++){
                                        
                    $(".mask-prize-content").append('<dl class="mask-prize-content-list">'+
                         '<dt>'+
                            '<img src="images/prize_content_four.png" />'+
                        '</dt>'+
                        '<dd>'+myWinningList[i].prize_name+'</dd>'+
                    '</dl>');
                };

            }
        });
    };

    // var total_number = localStorage.getItem("total_number");
    //点击抽奖
    $btn.click(function () {
        draw_winning_prize();//抽奖
        if (bool) return; // 如果在执行就退出
        bool = true; // 标志为 在执行
        if (now_number <= 0) { //当抽奖次数为0时
            // $change.html(0);//次数显示为0
            bool = false;
            $(".border").text("今日抽奖机会已经用完");
            alert("没有次数了");
        } else { //还有次数就执行
            // total_number = total_number-1;
            $change.html(now_number);//显示剩余次数
            
            if(now_number == 0){
                $(".border").text("今日抽奖机会已经用完");
            };
            // data.count <= 0 && (data.count = 0);
            // $change.html(total_number);//显示剩余次数
            $prize.removeClass("running");
            clickFn();
        }
    });

    //随机概率
    function clickFn() {
               
        switch (winningPrizeiD) {//中奖概率，可控。根据得到的随机数控制奖品
            case 39:
                rotateFn(drawIdArray[0], 160, drawNameArray[0]);
                break;
            case 40:
                rotateFn(drawIdArray[1], -80, drawNameArray[1]);
                break;
            case 41:
                rotateFn(drawIdArray[2], -160, drawNameArray[2]);
                break;
            case 42:
                rotateFn(drawIdArray[3], 40, drawNameArray[3]);
                break;
            case 43:
                rotateFn(drawIdArray[4], 80, drawNameArray[4]);
                break;
            case 44:
                rotateFn(drawIdArray[5], -40, drawNameArray[5]);
                break;
            case 45:
                rotateFn(drawIdArray[6], -120, drawNameArray[6]);
                break;
            case 46:
                rotateFn(drawIdArray[7], 120, drawNameArray[7]);
                break;
            case 47:
                rotateFn(drawIdArray[8], 0, drawNameArray[8]);
                break;
        }
    }

    //选中函数。参数：奖品序号、角度、提示文字
    function rotateFn(awards, angle, text) {
        
        bool = true;
        $prize.stopRotate();
        $prize.rotate({
            angle: 0,//旋转的角度数
            duration: 4000, //旋转时间
            animateTo: angle + 1440, //给定的角度,让它根据得出来的结果加上1440度旋转。也就是至少转4圈
            callback: function () {
                bool = false; // 标志为 执行完毕
                win();

                // show(1, 1, text);
            }
        });
    }


    //我的奖品列表
    $(".my_prize").click(function () {
        
        $(".mask-prize-content").empty()
        for(var i=0;i<myWinningList.length;i++){
                                        
                    $(".mask-prize-content").append('<dl class="mask-prize-content-list">'+
                         '<dt>'+
                            '<img src="images/prize_content_four.png" />'+
                        '</dt>'+
                        '<dd>'+myWinningList[i].prize_name+'</dd>'+
                    '</dl>');
                };

        $maskRize.show();
    });

    //分享
    $(".my_prize_share").click(function(){
        $(function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
            var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if (isAndroid) {
                //移动端分享数据
                jsfunction.qdShare("http://www.myzzz.top/inviteFriendApp2.html");
            }
            if (isIOS) {
                window.webkit.messageHandlers.prizeCookies.postMessage({

                });
            }
        });
    });

    //中奖信息提示
    $("#close,.win,.btn").click(function () {
        $prize.addClass("running");
        init();
    });
});

