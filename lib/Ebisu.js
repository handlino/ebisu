/* Synopsys

## Attach an event handler:

    Ebisu( $event_name, $selector ).attach( $callback )

## Trigger that event:

    Ebisu( $event_name)         // no arguments
    Ebisu( $event_name, [])     // no argumentss
    Ebisu( $event_name, $args ) // the second argument must be an array.

## Detach an event handler

    Ebisu( $event_name ).detach();
 */

/*
 * e = event name
 * s = selector
 *
 */

Ebisu = function(e, s) {
    if (this == window)
        return new Ebisu(e,s);

    this["event_name"] = e;

    if (s instanceof Array || s == null) {
        this.trigger(s);
    }

    this["selector"] = s;
    return this;
}

Ebisu.__registry = [];

Ebisu.prototype = {
    'trigger': function(s) {
        var e = this["event_name"];
        for(var i = 0; i < Ebisu.__registry.length; i++) {
            if (Ebisu.__registry[i][0] == e) {
                Ebisu.__registry[i][2].apply(
                    $(Ebisu.__registry[i][1]),
                    s
                )
            }
        }
        return this;
    },
    'attach': function(cb) {
        Ebisu.__registry.push([this["event_name"], this["selector"], cb]);
        return this;
    }
}
