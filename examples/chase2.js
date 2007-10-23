$(document).ready(function($) {
    var gwidth = $(window).width() - 200;
    var gheight = $(window).height() - 200;

    var total = 10;
    for(var i = 0;i < total; i++) {
        $("<div class='chaser' id='chaser-" + i + "'></div>").appendTo("#field");
    }

    var chase =  function(loc_x, loc_y) {
        var self = this;
        var x = this.offsetLeft;
        var y = this.offsetTop;
        var v  = 1/(1+i);
        var dx = loc_x - x;
        var dy = loc_y - y;

        x = x + dx * v;
        y = y + dy * v;
        $(this).css({ left: x, top: y});
    }

    Ebisu("mouse near").attach(function(x, y) {
        Ebisu("mouse near 0").trigger(x, y);
    });

    for(var i = 0; i < total; i++) {
        Ebisu("mouse near " + i).to( jQuery("#chaser-" + i)[0] ).attach(
            (function(i) {
                return function(x, y) {
                    chase.apply(this, [x, y]);
                    setTimeout(function() {
                        Ebisu("mouse near " + (i+1)).trigger(x, y);
                    }, 100);
                }
            })(i)
        );
    }
});
