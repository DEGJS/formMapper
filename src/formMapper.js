const multiSelectSelector = 'select[multiple]';
const radioSelector = 'input[type="radio"]';
const checkboxSelector = 'input[type="checkbox"]';
const fileSelector = 'input[type="file"]';
const defaultElementSelectors = 'input, select, textarea';
const defaults = {
    elementSelectors: defaultElementSelectors,
    shouldStringify: false
};

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
        } else if (el.matches(fileSelector)) {
            returnVal[el.name] = el.files;
        } else {
            returnVal[el.name] = el.value;
        }
    }
    return returnVal;
}

/**
 *
 * @param {Element | Element[]} input an input element, container element or an array of elements
 * @param {Object} opts overrides default settings
 * @returns {Object} with the key value pairs being { inputName: inputValue }
 */
function getValues(input, opts = {}) {
    const settings = {...defaults, ...opts};
    let retVal = {};

    if (input) {
        if (input.tagName) {
            const elementList = input.matches(defaultElementSelectors) ? [input] : getInputElements(input, settings.elementSelectors);
            if (elementList.length) {
                retVal = mapValues(elementList);
            }
        } else if (input.length) {
            retVal = mapValues(input);
        }
    }

    return settings.shouldStringify ? JSON.stringify(retVal) : retVal;
}

export default {
    getValues,
    getInputElements
};