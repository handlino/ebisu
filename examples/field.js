$(document).ready(function($) {
    var mouse_x;
    var mouse_y;
    var mouse_x2;
    var mouse_y2;

    var mouse_still = true;

    $("#field").mousemove(
        function(e) {
            mouse_x = e.clientX;
            mouse_y = e.clientY;

            (function(x, y) {
                setTimeout(function() {
                    Ebisu("mouse near").trigger(x,y);
                },0);
            })(e.clientX, e.clientY);
        }
    );

    Ebisu("mouse still").attach(function(x, y) {
        Ebisu("mouse near").trigger(mouse_x, mouse_y);
    });

    setInterval(function() {
        var still = true;
        if (mouse_x != mouse_x2) {
            mouse_x2 = mouse_x;
            still = false;
        }
        if (mouse_y != mouse_y2) {
            mouse_y2 = mouse_y;
            still = false;
        }
        if (still == true) {
            Ebisu("mouse still").trigger(mouse_x, mouse_y);
        }
    }, 25);

});
