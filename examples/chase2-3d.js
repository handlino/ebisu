$(document).ready(function($) {
    for(var i = 0; i < 10; i++) {
        Ebisu("mouse near " + i).to( jQuery("#chaser-" + i)[0] ).attach(
            function(x, y) {
                var r = Math.sqrt(3 * y);
                $(this).css({ width: r,  height: r });
            }
        )
    }
});
