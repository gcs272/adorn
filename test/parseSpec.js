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
            '<input type="hidden" name="a_hidden_attr" ' +
                'value="definitely-not-fnord" />' +
            '<input type="text" name="name" value="a name" />' +
            '<input type="text" name="price" value="5.10" />' +
            '<input type="text" name="percent" value="32" />' +
            '<input type="date" name="date" value="6/1/2014" />' +
            '</form>');
        
        this.AdornModel = Model.extend({
            schema: {
                'name': null,
                'price': Formatters.cost,
                'percent': Formatters.percent,
                'date': Formatters.date
            }
        });

    });

    it('Should parse from a form', function() {
        var model = new this.AdornModel();
        var update = model.parseForm(this.el);

        expect(_.keys(update)).to.have.length(4);
        expect(update.name).to.equal('a name');
        expect(update.price).to.equal(5.1);
        expect(update.percent).to.equal(0.32);
        expect(update.date).to.equal('2014-06-01');
    });

    it('Should parse items in attribs, but not in the schema', function() {
        var model = new this.AdornModel({
            'a_hidden_attr': 'fnord!',
            'price': 100
        });

        var update = model.parseForm(this.el);
        expect(_.keys(update)).to.have.length(5);
        expect(update.name).to.equal('a name');
        expect(update.price).to.equal(5.1);
        expect(update.percent).to.equal(0.32);
        expect(update.date).to.equal('2014-06-01');
        expect(update.a_hidden_attr).to.equal('definitely-not-fnord');
    });

    it('Shouldnt stomp values not in the dom', function() {
        var model = new this.AdornModel({
            'id': 'some-id'
        });

        model.set(model.parseForm(this.el));
        expect(model.id).to.equal('some-id');
    });
});
