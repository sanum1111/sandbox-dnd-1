
export const setEditorPanelShow = (state, { payload }) => {
    state.editorPanelShow = payload;
};

export const cleanupPreviewParams = (state) => {
    state.previewParams = {};
};

export const setPreviewParams = (state, { payload }) => {
    state.previewParams = {
        ...state.previewParams,
        ...payload,
    };
};