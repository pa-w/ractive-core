var EventEmitter = require ('events');
function Base () { this.data = {}; }
Base.prototype = Object.create (EventEmitter.prototype);
Base.prototype.constructor = Base;
/*
*	data:
*		this is where we store the data from the setterss
*/

Base.prototype.data = {}

/* 
*	settersFromArray: 
*		enables the pattern: this.varName (value) and this.varName () == value 
*/
Base.prototype.settersFromArray = function (arr, fCb) { 
	for (var x in arr) {
		var me = this;
		var cb = function (k) { 
			return function () { 
				if (arguments.length > 0) { 
					var originalArgs = Array.prototype.slice.call(arguments)
					if (arguments.length > 1) {
						me.data [k] = originalArgs;
					} else {
						me.data [k] = originalArgs [0];
					}
					if (fCb) {
						var args = [k].concat (originalArgs);
						fCb.apply (me, args);
					}
					return me;
				}

				return me.data [k];
			}
		}
		this [arr [x]] = cb (arr [x]); 
	}
}
/*
* propertiesFromJSON
*/
Base.prototype.propertiesFromJSON = function (json) {
	if (!json) return;
	var ks = Object.keys (json);

	this.settersFromArray (ks);

	for (var k in ks) { 
		this [ks [k]] (json [ks [k]]);
	}
}
module.exports = Base;
