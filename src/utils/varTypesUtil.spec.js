import * as types from './varTypesUtil';

describe('varTypesUtil Module', () => {

    it('isObject(v) returns true for Object data type', () => {
        const v = {a: 1};
        expect(types.isObject(v)).toBe(true);
    });

    it('isObject(v) returns false for non Object data type', () => {
        const v = [1, 2, 3];
        expect(types.isObject(v)).toBe(false);
    });

    it('isArray(v) returns true for Array data type', () => {
        const v = [1, 2, 3];
        expect(types.isArray(v)).toBe(true);
    });

    it('isArray(v) returns false for non Array data type', () => {
        const v = {a: 1};
        expect(types.isArray(v)).toBe(false);
    });

    it('isBoolean(v) returns true for Boolean data type', () => {
        expect(types.isBoolean(true)).toBe(true);
        expect(types.isBoolean(false)).toBe(true);
    });

    it('isString(v) returns true for String data type', () => {
        const v = 'Hello';
        expect(types.isString(v)).toBe(true);
    });

    it('isNumber(v) returns true for Number data type', () => {
        expect(types.isNumber(100)).toBe(true);
        expect(types.isNumber(1.6)).toBe(true);
    });

});