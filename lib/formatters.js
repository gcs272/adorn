'use strict';

var _ = require('underscore'),
    moment = require('moment');

module.exports = {

    /* Format to iso date, parse from various date formats */
    date: {
        format: function(value) {
            var date = moment(value);
            if (!date.isValid()) {
                throw new Error('formatters.date - Invalid date format');
            }

            return date.format('l');
        },
        parse: function(value) {
            var date = moment(value);
            if (!date.isValid()) {
                throw new Error('formatters.date - Invalid date format');
            }
            return date.format('YYYY-MM-DD');
        }
    },

    /* Format a number as two decimal places, parse as float */
    cost: {
        format: function(value) {
            if (!_.isNumber(value)) {
                throw new Error('fomatters.cost() - value is not a number');
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
            if (!_.isNumber(value)) {
                throw new Error('fomatters.formatPercent() - ' +
                    'value is not a number');
            }

            if (value < 0 || value > 1) {
                throw new Error('formatters.formatPercent() - value is an ' +
                    'incorrect decimal for a percentage');
            }

            return (value * 100).toFixed(0);
        },
        parse: function(value) {
            /* Parse to six places */
            return parseFloat((parseFloat(value) / 100).toFixed(6));
        }
    }
};

