'use strict';

var _ = require('underscore'),
    moment = require('moment');

var dateFormat = _.template('<%=month%>/<%=day%>/<%=year%>'),
    percentFormat = _.template('<%=percent%>');

module.exports = {

    /**
     * Format a ISO 8601 string date to a localized Date.
     * @param {String} value
     * @return String
     */
    date: function(value) {
        var date = moment(value);
        if (!date.isValid()) {
            throw new Error('formatters.date() - Invalid date format');
        }

        return date.format('l');
    },

    /**
     * Format a number value to two places.
     * @param {Number} value
     * @return String
     */
    cost: function (value) {
        if (!_.isNumber(value)) {
            throw new Error('fomatters.cost() - value is not a number');
        }
        return value.toFixed(2);
    },

    /**
     * Format a number to a '%' string.
     * @param {Number} value
     * @return String
     */
    percent: function (value) {
        if (!_.isNumber(value)) {
            throw new Error('fomatters.formatPercent() - value is not a number');
        }

        if (value < 0 || value > 1) {
            throw new Error('formatters.formatPercent() - value is an incorrect decimal for a percentage');
        }

        return (value * 100).toFixed(0);
    }
};

