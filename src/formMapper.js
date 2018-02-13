const multiSelectSelector = 'select[multiple]';
const radioSelector = 'input[type="radio"]';
const checkboxSelector = 'input[type="checkbox"]';
const defaultElementSelectors = 'input, select, textarea';

function getInputElements(formEl, selectorSettings = defaultElementSelectors) {
    return [...formEl.querySelectorAll(selectorSettings)];
}

function mapValues(elementList) {
    const returnVal = {};
    for (const el of elementList) {
        if (!el.name) {
            continue;
        }

        if (el.matches(checkboxSelector)) {
            if (el.checked) {
                const currentVal = returnVal[el.name] || [];
                returnVal[el.name] = [...currentVal, el.value];
            }
        } else if (el.matches(radioSelector)) {
            if (el.checked) {
                returnVal[el.name] = el.value;
            }
        } else if (el.matches(multiSelectSelector)) {
            returnVal[el.name] = [...el.options]
                                    .filter(optEl => optEl.selected)
                                    .map(opt => opt.value);
        } else {
            returnVal[el.name] = el.value;
        }
    }
    return returnVal;
}

/**
 *
 * @param {Element | Element[]} input a form element or an array of Elements
 * @param {String} elementSelectors overrides for defaultElementSelectors -- if selectors should be class based, etc
 * @returns {Object} with the key value pairs being { inputName: inputValue }
 */
function getValues(input, elementSelectors = defaultElementSelectors) {
    if (input) {
        if (input.tagName) {
            const elementList = input.matches(defaultElementSelectors) ? [input] : getInputElements(input, elementSelectors);
            if (elementList.length) {
                return mapValues(elementList);
            }
        } else if (input.length) {
            return mapValues(input);
        }
    }

    return {};
}

export default {
    getValues,
    getInputElements
};