const formElSelector = 'form';
const defaultElementSelectors = {
    input: 'input',
    checkbox: 'input[type="checkbox"]',
    radio: 'input[type="radio"]',
    select: 'select',
    multiSelect: 'select[multiple]',
    textArea: 'textarea'
};

function getInputElements(formEl, selectorSettings = defaultElementSelectors) {
    const listOfSelectors = Object.keys(selectorSettings)
                                .map(k => selectorSettings[k])
                                .join(', ');
    return [...formEl.querySelectorAll(listOfSelectors)];
}

function mapValues(elementList, selectorSettings) {
    const returnVal = {};
    for (const el of elementList) {
        if (!el.name) {
            continue;
        }

        if (el.matches(selectorSettings.checkbox)) {
            if (el.checked) {
                if (!returnVal[el.name]) {
                    returnVal[el.name] = [];
                }
                returnVal[el.name].push(el.value);
            }
        } else if (el.matches(selectorSettings.radio)) {
            if (el.checked) {
                returnVal[el.name] = el.value;
            }
        } else if (el.matches(selectorSettings.multiSelect)) {
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
 * @param {Element} formEl a form element
 * @param {Object} opts overrides for defaultElementSelectors -- if selectors should be class based, etc
 * @returns {Object} with the key value pairs being { inputName: inputValue }
 */
function getValues(formEl, opts = {}) {
    if (formEl && formEl.tagName) {
        if (formEl.tagName.toLowerCase() === formElSelector) {
            const selectorSettings = {...defaultElementSelectors, ...opts};
            const elementList = getInputElements(formEl, selectorSettings);
            if (elementList.length) {
                return mapValues(elementList, selectorSettings);
            }
        }
    }

    return {};
}

export default {
    getValues,
    getInputElements
};