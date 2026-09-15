/*
 *  return true if two objs are the same in value
 */
export const deepEqual = (obj1: unknown, obj2: unknown): boolean => {
    if (Object.is(obj1, obj2)) {
        return true;
    }

    if (
        obj1 === null ||
        obj2 === null ||
        typeof obj1 !== "object" ||
        typeof obj2 !== "object"
    ) {
        return false;
    }

    if (Array.isArray(obj1) !== Array.isArray(obj2)) {
        return false;
    }

    const first = obj1 as Record<string, unknown>;
    const second = obj2 as Record<string, unknown>;
    const firstKeys = Object.keys(first);

    if (firstKeys.length !== Object.keys(second).length) {
        return false;
    }

    return firstKeys.every(
        (key) =>
            Object.prototype.hasOwnProperty.call(second, key) &&
            deepEqual(first[key], second[key])
    );
};
