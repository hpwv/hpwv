import _ from 'lodash';

export function switchShowElements(state, action) {
    return {
        ...state,
        showElements: action.value
    };
}

export function elementsUpdate(state, action) {
    if (!state.showElements) {
        return {
            ...state
        }
    }
    const newElements = {...state.elements};
    action.events.forEach(it => {
        newElements[it.element.id] = {
            ...it.element,
            timestamp: it.timestamp
        }
    });
    return {
        ...state,
        elements: newElements,
        elementIds: _.keys(newElements)
    };
}

export function setElementsStale(state, action) {
    if (!state.showElements) {
        return {
            ...state
        }
    }
    const newElements = {...state.elements};
    action.ids.forEach(id => {
        newElements[id].stale = true;
    });
    return {
        ...state,
        elements: newElements
    };
}

export function deleteElements(state, action) {
    const newElements = {...state.elements};
    action.ids.forEach(id => {
        delete newElements[id];
    });
    return {
        ...state,
        elements: newElements,
        elementIds: _.keys(newElements)
    };
}

export function clearElements(state) {
    return {
        ...state,
        elements: {},
        elementIds: []
    };
}
