/*
*  return true if two objs are the same in value
*/
export const deepCompare = (obj1 : any, obj2 : any) : boolean => {
    if (obj1 === obj2) {
        return true;
    }
    if (typeof obj1 !== typeof obj2) {
        return false;
    }
    if (typeof obj1 !== 'object') {
        return obj1 === obj2;
    }
    let isEqual : boolean = true;
    for (let key in obj1) {
        if (typeof obj1[key] === 'object') {
            isEqual = isEqual && deepCompare(obj1[key], obj2[key]);
        } else {
            isEqual = isEqual && (obj1[key] === obj2[key]);
        }
        if (!isEqual) {
            return false;
        }
    }
    return isEqual;
}
