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
/* Private variables and functions */
    var registry = {};
    var re_registry = [];

    var find_re = function(name) {
        var ret = [];
        for(var i=0; i < re_registry.length; i++) {
            if ( re_registry[i][0].test(name) ) {
                ret.push([ re_registry[i][1], re_registry[i][2] ]);
            }
        }
        return ret;
    };

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

    Ebisu.$ =
        typeof jQuery == 'function' ?
        jQuery :
        (
            typeof $$ != 'undefined' ?
                $$ :
                function(id) {
                    return document.getElementById(id);
                }
        );

    Ebisu.prototype = {
        'to': function(sel) {
            this.selector = sel;
            return this;
        },
        'trigger': function() {
            var cbs = new Array();
            Array.prototype.push.apply(cbs, registry[ this.name ]);
            if (re_registry.length) {
                var recbs = find_re(this.name);
                for(var i=0; i< recbs.length; i++) {
                    if (recbs[i] == null) continue;
                    cbs.push(recbs[i]);
                }
            }
            for(var i=0; i < cbs.length; i++) {
                if (cbs[i] == null) continue;
                var s = cbs[i][0];
                var cb = cbs[i][1];
                if (cb == null) continue;
                if (typeof s == 'string') {
                    cb.apply(Ebisu.$(s), arguments);
                }
                else {
                    cb.apply(s, arguments);
                }
            }

            return this;
        },
        'attach': function(cb) {
            var e = this.name;
            var s = this.selector;

            if (e instanceof RegExp) {
                re_registry.push([e, s, cb]);
            }
            else {
                if ( registry[e] == null )
                    registry[e] = [];

                registry[e].push([s, cb]);
            }
            return this;
        },
        'detach': function() {
            var e = this.name;
            var s = this.selector;
            if (e == null) return;
            if (s == null) {
                registry[e] = []
            }
            else {
                var reg = registry[e];
                for(var i=0; i<reg.length; i++) {
                    if( reg[i][0] == s) {
                        reg[i][1] = null;
                    }
                }
            }
        }
    }

})();
