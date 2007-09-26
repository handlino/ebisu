/* Synopsys

## Attach an event handler:

    Ebisu( $event_name, $selector ).attach( $callback )

## Trigger that event:

    Ebisu( $event_name)         // no arguments
    Ebisu( $event_name, [])     // no argumentss
    Ebisu( $event_name, $args ) // the second argument must be an array.

## Detach event handlers

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

    Ebisu.__registry = {};

    Ebisu.$ = typeof $ == 'undefined' ? function(id) {return document.getElementById(id); } : $;

    Ebisu.prototype = {
        'trigger': function(args) {
            var e = this["event_name"];
            var cbs = Ebisu.__registry[e];

            for(var i=0;i<cbs.length;i++) {
                var s = cbs[i][0];
                var cb = cbs[i][1];
                if (cb == null) continue;
                if (s instanceof HTMLElement) {
                    cb.apply( s, args);
                }
                else {
                    cb.apply( Ebisu.$(s), args);
                }
            }

            return this;
        },
        'attach': function(cb) {
            var e = this["event_name"];
            var s = this["selector"];

            if ( Ebisu.__registry[e] == null )
                Ebisu.__registry[e] = [];

            Ebisu.__registry[e].push([s, cb]);
            return this;
        },
        'detach': function() {
            var e = this["event_name"];
            var s = this["selector"];
            if (e == null) return;
            if (s == null) {
                Ebisu.__registry[e] = []
            }
            else {
                var reg = Ebisu.__registry[e];
                for(var i=0; i<reg.length; i++) {
                    if( reg[i][0] == s) {
                        reg[i][1] = null;
                    }
                }
            }
        }
    }

})();
