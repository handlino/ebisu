/* Synopsys

## Attach an event handler:

    Ebisu( $event_name ).to( $selector ).attach( $callback )

## Trigger that event:

    Ebisu( $event_name).trigger()
    Ebisu( $event_name).trigger(arg1, arg2, ...)

## Detach event handlers

    Ebisu( $event_name).to( $selector ).detach();

 */

(function() {

/*
 * e = event name
 * s = selector
 *
 */

    Ebisu = function(e, s) {
        if (this == window)
            return new Ebisu(e);

        this.name = e;

        return this;
    }

    Ebisu.__registry = {};

    Ebisu.$ = typeof jQuery == 'function' ? jQuery :
        typeof $$ != 'undefined' ? $$ :
        function(id) {return [ document.getElementById(id)]};

    Ebisu.prototype = {
        'to': function(sel) {
            this.selector = sel;
            return this;
        },
        'trigger': function() {
            var cbs = Ebisu.__registry[ this.name ];
            for(var i=0; i < cbs.length; i++) {
                var [s, cb] = cbs[i];
                if (cb == null) continue;
                if (typeof s == 'string') {
                    var els = Ebisu.$(s);
                    for(var j=0; j < els.length; j++) {
                        cb.apply(els[j], arguments);
                    }
                }
                else {
                    if (s.length) {
                        for(var j=0; j < s.length; j++) {
                            cb.apply(s[j], arguments);
                        }
                    }
                    else {
                        cb.apply(s, arguments);
                    }
                }
            }

            return this;
        },
        'attach': function(cb) {
            var e = this.name;
            var s = this.selector;

            if ( Ebisu.__registry[e] == null )
                Ebisu.__registry[e] = [];

            Ebisu.__registry[e].push([s, cb]);
            return this;
        },
        'detach': function() {
            var e = this.name;
            var s = this.selector;
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
