const TYPE_NUMBER = '[object Number]';
const TYPE_STRING = '[object String]';
const TYPE_BOOLEAN = '[object Boolean]';
const TYPE_ARRAY = '[object Array]';
const TYPE_OBJECT = '[object Object]';

export const isObject = v => {
    return Object.prototype.toString.call(v) === TYPE_OBJECT;
}

export const isArray = v => {
    return Object.prototype.toString.call(v) === TYPE_ARRAY;
}

export const isBoolean = v => {
    return Object.prototype.toString.call(v) === TYPE_BOOLEAN;
}

export const isString = v => {
    return Object.prototype.toString.call(v) === TYPE_STRING;
}

export const isNumber = v => {
    return Object.prototype.toString.call(v) === TYPE_NUMBER;
}