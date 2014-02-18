'use strict';

var _ = require('underscore'),
    moment = require('moment');

module.exports = {

    /* Format to iso8601 date, parse from various date formats */
    date: {
        format: function(value) {
            var date = moment(value);
            if (!date.isValid()) {
                return null;
            }

            return date.format('YYYY-MM-DD');
        },
        parse: function(value) {
            var date = moment(value);
            if (!date.isValid()) {
                return null;
            }
            return date.format('YYYY-MM-DD');
        }
    },

    /* Format a number as two decimal places, parse as float */
    cost: {
        format: function(value) {
            if (!_.isNumber(value)) {
                return null;
            }
            return value.toFixed(2);
        },
        parse: function(value) {
            return parseFloat(value);
        }
    },

    /* Format & parse percentages */
    percent: {
        format: function(value) {
            if (!_.isNumber(value) || value < 0 || value > 1) {
                return null;
            }

            return (value * 100).toFixed(0);
        },
        parse: function(value) {
            /* Parse to six places */
            return parseFloat((parseFloat(value) / 100).toFixed(6));
        }
    }
};

