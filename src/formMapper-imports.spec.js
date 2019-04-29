import {getValues, getInputElements} from './formMapper';

describe('importing individual functions of formMapper', () => {

    it('should import getValues individually', () => {
        expect(getValues).toBeInstanceOf(Function);
    });

    it('should import getInputElements individually', () => {
        expect(getInputElements).toBeInstanceOf(Function);
    });
});