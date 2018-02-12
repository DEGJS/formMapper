# formMapper
A utility to take in a form element and return an object consisting of form values

## Install
formMapper is an ES6 module. Consequently, you'll nee an ES6 transpiler ([Babel](https://babeljs.io) is an option) and a module loader as part of your Javascript workflow.

If you are already using the [JSPM package manager](http://jspm.io) for your project, you can install formMapper with the following command:

```
$ jspm install github:DEGJS/formMapper
```

## Usage 
### Importing individual methods:
```
import { getValues } from "DEGJS/formMapper";
.
.
.
const formData = getValues(formEl);
```

### Importing all methods:
```
import formMapper from "DEGJS/formMapper";
.
.
.
const formData = formMapper.getValues(formEl);
```

## Methods

## Browser Support
formMapper depends on the following browser APIs:

+ matches: [Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Element/matches) | [Polyfill](https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill)

As of Febrary 2018, matches is supported in IE9 and up.

To support legacy browsers, you'll need to include polyfills for the above APIs.
