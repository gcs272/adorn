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
        var values = this.toJSON();
        return _.extend(values,
            _.object(_.map(this.schema, function(formatter, name) {
            /* Check for values, format them if they exist */
            if (this.has(name)) {
                var val = this.get(name);
                if (val == null || val === ''){
                    return [name, ''];
                }

                if (_.isObject(formatter) && _.isFunction(formatter.format)) {
                    return [name, formatter.format(this.get(name))];
                } else {
                    return [name, this.get(name)];
                }
            } else {
                return [name, ''];
            }
            var value = this.has(name) ? formatter(this.get(name)) : null;
            return [name, value];
        }, this)));
    },
    parseForm: function(el) {
        /* Add attributes to schema as null formatters */
        var schema = _.extend(_.object(
            _.map(this.attributes, function(value, name) {
                return [name, null];
        })), this.schema);

        var values = {};
        _.each(schema, function(formatter, name) {
            var input = el.find('[name=' + name + ']');
            if (input.length > 0) {
                var value = input.val();
                if (_.isObject(formatter) && _.isFunction(formatter.parse)) {
                    values[name] = formatter.parse(value);
                } else {
                    values[name] = value;
                }
            }
        }, this);

        return _.extend(this.toJSON(), values);
    }
});
