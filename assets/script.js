const CARD_NUM = 48;
let count = [];

$(document).ready(function() {

    init();

});


function init() {
    for (let i = 1; i <= CARD_NUM; i++) {
      $('<div></div>').addClass("imgHolder").appendTo('.gallery');
    }

    // load images
    $('.imgHolder').each(function(idx) {
        $(this).css({
            "background-image": "url(https://erinzy-1258568418.cos.ap-shanghai.myqcloud.com/portfolio/assets/project365/" + (1+idx) + ".png)",
            "background-size": "cover",
            "background-position": "center",
            "background-repeat": "no-repeat",
            "background-color": "white"
        });
    });
}
