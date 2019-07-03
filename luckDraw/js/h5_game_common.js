var $maskRize = $("#mask-prize"),//我的奖品遮罩层
    $mask = $("#mask"),//中奖遮罩层
    $winning = $(".winning"),//中奖
    $card = $("#card"),
    $close = $("#close");
    //link = false;//判断是否在链接跳转中


$("#close-prize").click(function () {
    $maskRize.hide();
});

/*中奖信息提示*/
function win() {
    //遮罩层显示
    $mask.show();

    $winning.addClass("reback");
    setTimeout(function () {
        $card.addClass("pull");
    }, 500);

    //关闭弹出层
    $("#close,.win,.btn").click(function () {
    //$close.click(function () {
        $mask.hide();
        $winning.removeClass("reback");
        $card.removeClass("pull");
    });
    /*$(".win,.btn").click(function () {
        link = true;
    });*/
}

//此处可以在commonjs中合并
function queryString(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if(results === null) {
        return "";
    }
    else {
        return decodeURIComponent(results[1].replace(/\+/g, " "));
    }
}



