'use strict';

var Backbone = require('backbone'),
    _ = require('underscore');

module.exports = Backbone.Model.extend({
    _getBlankRepr: function(schema) {
        return _.object(_.map(schema, function(formatter, name) {
            if (_.isObject(formatter) && !_.isFunction(formatter.format)) {
                return [name, this._getBlankRepr(formatter)];
            } else {
                return [name, ''];
            }
        }, this));
    },

    _format: function(schema, attribs) {
        var tuples = _.map(schema, function(formatter, name) {
            if (_.has(attribs, name) && attribs[name] !== null) {
                if (_.isObject(formatter) && _.isFunction(formatter.format)) {
                    return [name, formatter.format(attribs[name])];
                } else if (_.isObject(formatter) && !_.isFunction(formatter.format)) {
                    return [name, this._format(formatter, attribs[name])];
                }
            }
        }, this);

        return _.object(_.filter(tuples, function(tuple) { return (tuple !== undefined); }));
    },

    _formatNulls: function(repr) {
        return _.object(_.map(repr, function(value, key) {
            if (_.isObject(value)) {
                return [key, this._formatNulls(value)];
            } else {
                return [key, (value !== null) ? value : ''];
            }
        }, this));
    },

    formatted: function() {
        /* If no schema is present, just use Backbone's toJSON */
        if (_.isUndefined(this.schema)) {
            return this.toJSON();
        }

        var repr = _.extend(this._getBlankRepr(this.schema),
            _.extend(this.toJSON(), this._format(this.schema, this.attributes)));
        return this._formatNulls(repr);
    },

    _compileSchema: function(schema, attribs) {
        /* Combine the schema with attributes from the model */
        return _.extend(_.object(_.map(attribs, function(value, name) {
            return [name, null];
        })), schema);
    },

    _parse: function(schema, el, prefix) {
        if (prefix === undefined) {
            prefix = '';
        }

        var values = _.map(schema, function(formatter, name) {
            var value = el.find('[name="' + prefix + name + '"]').val();
            
            if (_.isObject(formatter)) {
                if (_.isFunction(formatter.format)) {
                    if (value !== undefined) {
                        return [name, formatter.parse(value)];
                    }
                } else {
                    return [name, _.object(this._parse(formatter, el, prefix + name + '.'))];
                }
            } else {
                if (value !== undefined) {
                    return [name, (value === '') ? null : value];
                }
            }
        }, this);
    
        return _.filter(values, function(val) { return val !== undefined; });
    },

    parseForm: function(el) {
        var schema = this._compileSchema(this.schema, this.attributes);
        return _.extend(this.attributes, _.object(this._parse(schema, el)));
    }
});
