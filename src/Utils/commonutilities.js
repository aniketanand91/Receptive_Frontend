
export function sanitizeQueryParams(inputParams) {
    if (!inputParams) {
        return {};
    }
    return Object.keys(inputParams).reduce((updatedParams, key) => {
        if (inputParams[key] !== null && inputParams[key] !== undefined && inputParams[key] !== "") {
            updatedParams[key] = inputParams[key];
        }
        return updatedParams
    }, {})
}


export function getDisplayValue(value) {
    if (!value) {
        return "-";
    }
    return value;
}


export function getDisplayNumberValue(value) {
    if (!value) {
        return 0;
    }
    return value;
}

export function getDistanceDisplayValue(value) {
    if (!isNaN(value)) {
        return Number(value).toFixed(1);
    }
    return Number(0).toFixed(1);
}
export function getAmountDisplayValue(value) {
    if (!isNaN(value)) {
        return Number(value).toFixed(2);
    }
    return Number(0).toFixed(2);
}
