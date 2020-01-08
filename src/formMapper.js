const multiSelectSelector = 'select[multiple]';
const radioSelector = 'input[type="radio"]';
const checkboxSelector = 'input[type="checkbox"]';
const fileSelector = 'input[type="file"]';
const defaultElementSelectors = 'input, select, textarea';
const defaults = {
    elementSelectors: defaultElementSelectors,
    shouldStringify: false,
    shouldReturnAllCheckboxVals: false
};

export function getInputElements(formEl, selectorSettings = defaultElementSelectors) {
    return [...formEl.querySelectorAll(selectorSettings)];
}

function mapValues(elementList, shouldReturnAllCheckboxVals) {
    if (!Array.isArray(elementList)) {
        return {};
    }

    return elementList.reduce((returnVal, el) => {
        if (!el.name) {
            return returnVal;
        }

        if (el.matches(checkboxSelector)) {
            if (shouldReturnAllCheckboxVals) {
                const currentVal = returnVal[el.name] || {};
                returnVal[el.name] = {
                    ...currentVal,
                    [el.value]: el.checked
                };
            } else {
                if (el.checked) {
                    const currentVal = returnVal[el.name] || [];
                    returnVal[el.name] = [...currentVal, el.value];
                }
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
        return returnVal;
    }, {});
}

/**
 *
 * @param {Element | Element[]} input an input element, container element or an array of elements
 * @param {Object} opts overrides default settings
 * @returns {Object} with the key value pairs being { inputName: inputValue }
 */
export function getValues(input, opts = {}) {
    const settings = { ...defaults, ...opts };
    const { shouldReturnAllCheckboxVals } = settings;
    let retVal = {};

    if (input) {
        if (input.tagName) {
            const elementList = input.matches(defaultElementSelectors) ? [input] : getInputElements(input, settings.elementSelectors);
            if (elementList.length) {
                retVal = mapValues(elementList, shouldReturnAllCheckboxVals);
            }
        } else if (input.length) {
            retVal = mapValues(input, shouldReturnAllCheckboxVals);
        }
    }

    return settings.shouldStringify ? JSON.stringify(retVal) : retVal;
}

export default {
    getValues,
    getInputElements
};