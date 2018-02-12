import formMapper from './formMapper';

describe('handling input', () => {
    it('should handle no passed elements', () => {
        expect(formMapper.getValues()).toEqual({});
    });

    it('should handle a single passed form element', () => {
        document.body.innerHTML = `
            <form></form>
        `;
        const formEl = document.querySelector('form');
        const retVal = formMapper.getValues(formEl);
        expect(retVal).toEqual({});
    });

    it('should handle items that are not form elements', () => {
        const emptyObj = {};

        let retVal = formMapper.getValues(emptyObj);
        expect(retVal).toEqual(emptyObj);

        retVal = formMapper.getValues({
            test: 'test'
        });
        expect(retVal).toEqual(emptyObj);

        retVal = formMapper.getValues(null);
        expect(retVal).toEqual(emptyObj);

        retVal = formMapper.getValues(4);
        expect(retVal).toEqual(emptyObj);

        retVal = formMapper.getValues('test');
        expect(retVal).toEqual(emptyObj);

        retVal = formMapper.getValues([]);
        expect(retVal).toEqual(emptyObj);

        const el = document.createElement('div');
        retVal = formMapper.getValues(el);
        expect(retVal).toEqual(emptyObj);
    });
});

describe('getting elements of form', () => {
    it('should return list of elements', () => {
        const elList = [
            document.createElement('input'),
            document.createElement('textarea')
        ];
        document.body.innerHTML = `
            <form>
                <input />
                <textarea></textarea>
            </form>
        `;
        const formEl = document.querySelector('form');
        const retVal = formMapper.getInputElements(formEl);
        expect(retVal).toEqual(elList);
    });

    it('should return list of elements -- if only one', () => {
        const elList = [document.createElement('input')];
        document.body.innerHTML = `
            <form>
                <input />
            </form>
        `;
        const formEl = document.querySelector('form');
        const retVal = formMapper.getInputElements(formEl);
        expect(retVal).toEqual(elList);

    });

    it('should handle no elements in form', () => {
        document.body.innerHTML = `
            <form></form>
        `;
        const formEl = document.querySelector('form');
        const retVal = formMapper.getInputElements(formEl);
        expect(retVal).toEqual([]);
    });

    it('should not return labels', () => {
        document.body.innerHTML = `
            <form>
                <label>Test Label</label>
            </form>
        `;
        const formEl = document.querySelector('form');
        const retVal = formMapper.getInputElements(formEl);
        expect(retVal).toEqual([]);
    });
});

describe('map values', () => {
    it('should only map inputs with name attr', () => {
        let comparisonVal = { };
        document.body.innerHTML = `
            <form>
                <input value="one" />
            </form>
        `;
        let formEl = document.querySelector('form');
        let retVal = formMapper.getValues(formEl);
        expect(retVal).toEqual(comparisonVal);

        comparisonVal = {
            input1: 'two'
        };
        document.body.innerHTML = `
            <form>
                <input name="input1" value="two" />
            </form>
        `;
        formEl = document.querySelector('form');
        retVal = formMapper.getValues(formEl);
        expect(retVal).toEqual(comparisonVal);
    });

    it('should handle text areas', () => {
        const comparisonVal = {textarea: 'The quick brown fox'};
        document.body.innerHTML = `
            <form>
                <textarea name="textarea">The quick brown fox</textarea>
            </form>
        `;
        const formEl = document.querySelector('form');
        const retVal = formMapper.getValues(formEl);
        expect(retVal).toEqual(comparisonVal);
    });

    it('should map single selects', () => {
        const comparisonVal = {
            input1: 'I am chosen'
        };
        document.body.innerHTML = `
            <form>
                <select name="input1">
                    <option value="I am chosen" selected>Chosen One</option>
                </select>
            </form>
        `;
        const formEl = document.querySelector('form');
        const retVal = formMapper.getValues(formEl);
        expect(retVal).toEqual(comparisonVal);
    });

    it('should handle multi selects', () => {
        const comparisonVal = {
            input1: ['one', 'two']
        };
        document.body.innerHTML = `
            <form>
                <select name="input1" multiple>
                    <option value="one" selected>One</option>
                    <option value="two" selected>Two</option>
                </select>
            </form>
        `;
        const formEl = document.querySelector('form');
        const retVal = formMapper.getValues(formEl);
        expect(retVal).toEqual(comparisonVal);
    });

    it('should handle checkbox groups', () => {
        let comparisonVal = {
            input1: ['one', 'two']
        };
        document.body.innerHTML = `
            <form>
                <input type="checkbox" name="input1" value="one" checked />
                <input type="checkbox" name="input1" value="two" checked />
            </form>
        `;
        let formEl = document.querySelector('form');
        let retVal = formMapper.getValues(formEl);
        expect(retVal).toEqual(comparisonVal);

        comparisonVal = {
            input1: ['two']
        };
        document.body.innerHTML = `
            <form>
                <input type="checkbox" name="input1" value="one" />
                <input type="checkbox" name="input1" value="two" checked />
            </form>
        `;
        formEl = document.querySelector('form');
        retVal = formMapper.getValues(formEl);
        expect(retVal).toEqual(comparisonVal);

        comparisonVal = {};
        document.body.innerHTML = `
            <form>
                <input type="checkbox" name="input1" value="one" />
                <input type="checkbox" name="input1" value="two" />
            </form>
        `;
        formEl = document.querySelector('form');
        retVal = formMapper.getValues(formEl);
        expect(retVal).toEqual(comparisonVal);
    });

    it('should handle radio buttons', () => {
        let comparisonVal = {
            input1: 'one'
        };
        document.body.innerHTML = `
            <form>
                <input type="radio" name="input1" value="one" checked />
                <input type="radio" name="input1" value="two" />
            </form>
        `;
        let formEl = document.querySelector('form');
        let retVal = formMapper.getValues(formEl);
        expect(retVal).toEqual(comparisonVal);

        comparisonVal = {
            input1: 'two'
        };
        document.body.innerHTML = `
            <form>
                <input type="radio" name="input1" value="one" />
                <input type="radio" name="input1" value="two" checked />
            </form>
        `;
        formEl = document.querySelector('form');
        retVal = formMapper.getValues(formEl);
        expect(retVal).toEqual(comparisonVal);

        comparisonVal = {};
        document.body.innerHTML = `
            <form>
                <input type="radio" name="input1" value="one" />
                <input type="radio" name="input1" value="two" />
            </form>
        `;
        formEl = document.querySelector('form');
        retVal = formMapper.getValues(formEl);
        expect(retVal).toEqual(comparisonVal);
    });

    it('should handle input elements with varying types', () => {
        const comparisonVal = {
            input1: '1',
            input2: '2',
            input3: '3',
            input4: ['4', '4.1'],
            input5: ['5', '5.1'],
            input6: '6.1'
        };
        document.body.innerHTML = `
            <form>
                <input name="input1" value="1" />
                <textarea name="input2">2</textarea>
                <select name="input3">
                    <option value="3" selected>3</option>
                </select>
                <select name="input4" multiple>
                    <option value="4" selected>4</option>
                    <option value="4.1" selected>4.1</option>
                </select>

                <input type="checkbox" name="input5" value="5" checked />
                <input type="checkbox" name="input5" value="5.1" checked />

                <input type="radio" name="input6" value="6" />
                <input type="radio" name="input6" value="6.1" checked />
            </form>
        `;
        const formEl = document.querySelector('form');
        const retVal = formMapper.getValues(formEl);
        expect(retVal).toEqual(comparisonVal);
    });
});