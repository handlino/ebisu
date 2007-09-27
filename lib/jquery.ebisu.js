/*

## Subscribe

    $("#e1").Ebisu("foobar").attach(function(){ ... });

## Trigger

    $.Ebisu("foobar");

## Unsubscribe

    $("#e1").Ebisu("foobar").detach();

*/
(function() {

    if ( typeof Ebisu == 'undefined')
        throw "You must load Ebisu.js first";

    Ebisu.$ = jQuery;

    jQuery.fn.Ebisu = function(e) {
        return (new Ebisu(e)).to(this);
    }

})();
