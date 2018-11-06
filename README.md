# formMapper
[![Build Status](https://travis-ci.org/DEGJS/formMapper.svg?branch=master)](https://travis-ci.org/DEGJS/formMapper)

A utility to take in an element or array of elements and return an object consisting of their values

## Install
formMapper is an ES6 module. Consequently, you'll nee an ES6 transpiler ([Babel](https://babeljs.io) is an option) as part of your Javascript workflow.

If you are already using NPM for your project, you can install formMapper with the following command:

```
$ npm install @degjs/form-mapper
```

## Usage 
### Importing individual methods:
```
import { getValues } from "@degjs/form-mapper";
.
.
.
const formData = getValues(formEl);
```

### Importing all methods:
```
import formMapper from "@degjs/form-mapper";
.
.
.
const formData = formMapper.getValues(formEl);
```

## DefaultElementSelectors
The options represent the default selector names for various input elements. Can be replaced with a string of any selectors that `querySelectAll` and `matches` supports.

Default: `input, select, textarea`
Example override: `.js-input, .js-checkbox-input, select[multiple], textarea`

## Methods

### getValues(input, opts)
The getValues method returns an object with key value pairs being { inputName: inputValue }

#### input
Type: `Element | Element[]`
The container element, input element or list of elements to get values from.

#### opts
Type: `Object`
Default: `{elementSelectors: defaultElementSelectors, shouldStringify: false}`
An object to override the default settings. `shouldStringify` declares if the returned value should be a string representation of an object or just the object.

### getInputElements(formEl, selectorSettings)
The getInputElements method returns an array of input elements as found by the default selectors.

#### formEl
Type: `Element`
The form element to extract inputs from.

#### selectorSettings
Type: `String`
Default: `defaultElementSelectors`
And string representing a comma-separated list of selectors to override any default element selectors.

## Browser Support
formMapper depends on the following browser APIs:

+ matches: [Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Element/matches) | [Polyfill](https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill)

As of Febrary 2018, matches is supported in IE9 and up.

To support legacy browsers, you'll need to include polyfills for the above APIs.
