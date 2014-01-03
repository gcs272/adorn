'use strict';

var expect = require('chai').expect,
    jsdom = require('jsdom'),
    _ = require('underscore'),
    Model = require('model'),
    Formatters = require('formatters');

global.document = global.document || jsdom.jsdom();
global.window = global.window || global.document.createWindow();

var $ = require('jqueryify');

describe('Parsing a rendered model', function() {
    beforeEach(function() {
        this.el = $('<form>' +
            '<input type="text" name="name" value="a name" />' +
            '<input type="text" name="price" value="5.10" />' +
            '<input type="text" name="percent" value="32" />' +
            '<input type="date" name="date" value="6/1/2014" />' +
            '</form>');
    });

    it('Should parse from a form', function() {
        var AdornModel = Model.extend({
            schema: {
                'name': null,
                'price': Formatters.cost,
                'percent': Formatters.percent,
                'date': Formatters.date
            }
        });

        var model = new AdornModel();
        var update = model.parseForm(this.el);

        expect(_.keys(update)).to.have.length(4);
        expect(update.name).to.equal('a name');
        expect(update.price).to.equal(5.1);
        expect(update.percent).to.equal(0.32);
        expect(update.date).to.equal('2014-06-01');
    });
});
