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
    var Ebisu = window.Ebisu = function(e) {
        if (this == window || !this.init)
            return new Ebisu(e);

        return this.init(e);
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
        'init': function(e) {
            this.name = e;
            return this;
        },

        'to': function(sel) {
            this.selector = sel;
            return this;
        },

        'trigger': function() {
            var cbs = new Array();
            if (registry[this.name] != null) {
                Array.prototype.push.apply(cbs, registry[ this.name ]);
            }
            if (re_registry.length) {
                var recbs = find_re(this.name);
                for(var i=0; i< recbs.length; i++) {
                    var recb = recbs[i];
                    if (recb == null) continue;

                    cbs.push(recb);
                }
            }

            for(var i=0; i < cbs.length; i++) {
                var cbi = cbs[i];
                if (cbi == null) continue;

                var c = cbi[1];
                if (c == null) continue;

                var s = cbi[0];

                if (typeof s == 'string') {
                    c.apply(Ebisu.$(s), arguments);
                }
                else {
                    c.apply(s, arguments);
                }
            }

            return this;
        },

        'attach': function(cb) {
            var e = this.name;
            var s = this.selector;

            if (s == null) s = window;

            if (e instanceof RegExp) {
                re_registry.push([e, s, cb]);
            }
            else {
                if ( registry[e] == null )
                    registry[e] = [];

                for ( var i = 0; i < registry[e].length ; i++) {
                    if (registry[e][i][0] == s && ( registry[e][i][1] == cb || registry[e][i][1].toString() == cb.toString() ) ) {
                        return this;
                    }
                }

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

})();

