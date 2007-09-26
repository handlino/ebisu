/* Synopsys

## Attach an event handler:

    Ebisu( $event_name, $selector ).attach( $callback )

## Trigger that event:

    Ebisu( $event_name)         // no arguments
    Ebisu( $event_name, [])     // no argumentss
    Ebisu( $event_name, $args ) // the second argument must be an array.

## Detach event handlers

    Ebisu( $event_name ).detach();
    Ebisu( $event_name, $selector ).detach();

 */

(function() {

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
        'trigger': function(args) {
            var e = this["event_name"];
            var cbs = Ebisu.__registry[e];
            for(s in cbs) {
                for(var i=0;i<cbs[s].length;i++) {
                    cbs[s][i].apply( $(s), args );
                }
            }
            return this;
        },
        'attach': function(cb) {
            var e = this["event_name"];
            var s = this["selector"];

            if ( Ebisu.__registry[e] == null )
                Ebisu.__registry[e] = {};

            if (Ebisu.__registry[e][s] == null)
                Ebisu.__registry[e][s] = [];

            Ebisu.__registry[e][s].push(cb)
            return this;
        },
        'detach': function() {
            var e = this["event_name"];
            var s = this["selector"];
            if (e == null) return;
            if (s == null) {
                Ebisu.__registry[e] = {}
            }
            else {
                Ebisu.__registry[e][s] = []
            }
        }
    }

})();
