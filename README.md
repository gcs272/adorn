# Adorn
### a Backbone.Model formatting extension

Adorn is a simple Backbone.Model extension that allows a schema to be defined on a model.
That model then has a .formatted() method that will return formatted strings.  The model
also has a .parseForm(el) method which, given a jquery style dom selector to the containing
form, will find form values matching the name provided in the schema.

## Available formatting types
* cost
* date
* percent

## Formatting example
```
var Model = require('adorn').model,
    Formatters = require('adorn').formatters;

var MyModel = Model.extend({
  schema: {
    name: null,
    joined: Formatters.date,
    dues: Formatters.cost
  }
});

var instance = new MyModel({
  name: 'instance',
  joined: '2013-01-01',
  dues: 15.2
});

instance.formatted(); // returns {name: 'instance', joined: '1/1/2013', dues: '15.20'}
```

## Form parsing example
```
<form>
  <input type="text" name="name" value="a form input" />
  <input type="date" name="joined" value="1/1/2013" />
  <input type="text" name="dues" value="15.20" />
</form>
```

Using the same MyModel as defined above:
```
var instance = new MyModel();
var updatedValues = instance.parseForm($('form'));
// updatedValues should equal {name: 'a form input', joined: '2013-01-01', dues: 15.2}

// Set the values from the schema (assuming they have the same names as the model)
instance.set(updatedValues);
```

More examples can be found in test/
