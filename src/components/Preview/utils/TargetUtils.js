import { useSelector } from "react-redux";
import { previewElementName } from "config/editor";

/**
 * Add preview child to element by id
 * @param {Array} children
 * @param {string} id
 * @returns
 */
export const useChildrenUpdater = (children, id) => {
    const previewParams = useSelector((state) => state.editor.previewParams);

    if (id === previewParams.id && Array.isArray(children)) {
        const _children = [...children];
        _children.splice(previewParams.index, 0, previewElementName);
        return _children;
    }

    return children;
};