'use strict';

var Backbone = require('backbone'),
    _ = require('underscore');

module.exports = Backbone.Model.extend({
    formatted: function() {
        /* If no schema is present, just use Backbone's toJSON */
        if (_.isUndefined(this.schema)) {
            return this.toJSON();
        }

        /* Iterate over the schema */
        return _.object(_.map(this.schema, function(formatter, name) {
            /* Check for values, format them if they exist */
            if (this.has(name)) {
                if (_.isObject(formatter) && _.isFunction(formatter.format)) {
                    return [name, formatter.format(this.get(name))];
                } else {
                    return [name, this.get(name)];
                }
            } else {
                return [name, null];
            }
            var value = this.has(name) ? formatter(this.get(name)) : null;
            return [name, value];
        }, this));
    },
    parseForm: function(el) {
        return _.object(_.map(this.schema, function(formatter, name) {
            var input = el.find('[name=' + name + ']');
            if (input.length > 0) {
                var value = input.val();
                if (_.isObject(formatter) && _.isFunction(formatter.parse)) {
                    return [name, formatter.parse(value)];
                } else {
                    return [name, value];
                }
            } else {
                return [name, null];
            }
        }, this));
    }
});
