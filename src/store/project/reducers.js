import initialState from "./initialState";

export const loadProject = (state, { payload }) => {
    state = {
        ...initialState,
        ...payload,
    };
};

export const createElement = (state, { payload }) => {
    const { id, ...props } = payload;

    if (!id) {
        throw new Error("[createElement] action key cannot be empty.");
    }

    state[id] = { ...props };
};

export const appendChild = (state, { payload }) => {
    const { id, child, index = 0 } = payload;

    if (!id || !child) {
        throw new Error("[appendChild] action params cannot be empty.");
    }

    state[id].children.splice(index, 0, child);
};

export const removeChild = (state, { payload }) => {
    const { id, child, index } = payload;

    if (!id || !child) {
        throw new Error("[removeChild] action params cannot be empty.");
    }

    const i = index || state[id].children.indexOf(child);

    state[id].children.slice(i, 1);
};

export const appendPreview = (state, { payload }) => {
    const { id, prevId, index = 0, child = "__preview" } = payload;

    if (!id) {
        throw new Error("[appendPreview] action params cannot be empty.");
    }

    if (prevId) {
        const prevIndex = state[prevId].children.indexOf(child);

        if (prevIndex >= 0) {
            state[prevId].children.splice(prevIndex, 1);
        }
    }

    const currentIndex = state[id].children.indexOf(child);

    if (currentIndex >= 0) {
        state[id].children.splice(currentIndex, 1);
    }

    state[id].children.splice(index, 0, child);
};