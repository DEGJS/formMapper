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

## Options
The options represent the default selector names for various input elements. Can be replaced with any selectors that `querySelectAll` and `matches` supports.

#### options.input
Type: `String`
Default: `input`
The default selector for input elements

#### options.checkbox
Type: `String`
Default: `input[type="checkbox"]`
The default selector for checkbox elements

#### options.radio
Type: `String`
Default: `input[type="radio"]`
The default selector for radio elements

#### options.select
Type: `String`
Default: `select`
The default selector for select elements

#### options.multiSelect
Type: `String`
Default: `select[multiple]`
The default selector for multi-select elements

#### options.textArea
Type: `String`
Default: `textarea`
The default selector for textarea elements

## Methods

### getValues(formElement, opts)
The getValues method returns an object with key value pairs being { inputName: inputValue }

#### formElement
Type: `Element`
The form element to extract values from.

#### opts
Type: `Object`
And object to override any default element selectors.

### getInputElements(formEl, selectorSettings)
The getInputElements method returns an array of input elements as found by the default selectors.

#### formEl
Type: `Element`
The form element to extract inputs from.

#### selectorSettings
Type: `Object`
Default: `defaultElementSelectors`
And object to specify element selectors.

## Browser Support
formMapper depends on the following browser APIs:

+ matches: [Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Element/matches) | [Polyfill](https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill)

As of Febrary 2018, matches is supported in IE9 and up.

To support legacy browsers, you'll need to include polyfills for the above APIs.
